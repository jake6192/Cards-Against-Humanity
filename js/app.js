const StartingWhiteCards = 10;

let roundWinner;
let activePlayer, roundCzar;
let playerList = [], playerCount = 0;
let activeWhiteCards = [], inPlayWhiteCards = [];
let activeBlackCard, usedBlackCards = [];

/*========================*/
/* ===  Constructors  === */
/*========================*/

function Player(playerName) {
  playerCount++;
  playerList.push(this);
  this.playerID = playerCount;
  this.playerName = playerName;
  this.score = 0;
  this.whiteCards = [];
  fillWhiteCards(this);
}

function WhiteCard(cardID, playerID, cardText) {
  this.cardID = cardID;
  this.playerID = playerID;
  this.cardText = cardText;
}

function BlackCard(cardID, cardText, blankSpaces) {
  this.cardID = cardID;
  this.cardText = cardText;
  this.blankSpaces = blankSpaces;
}


/*===================*/
/* ===  Methods  === */
/*===================*/

function createTempPlayer(name) {
  return new Promise(function(resolve, reject) {
    makeRequest('php/uploadTempUser.php', 'POST', JSON.stringify({ name: name }))
    .then(function(posts) {
      try {
        let PID = JSON.parse(posts.responseText)[0].PlayerID;
        if(PID > 0) resolve(PID);
        else reject(-1);
      } catch(e) { reject(-1); }
    }).catch(function(error) { reject(-1); });
  });
}

function getActiveGames() {
  return new Promise(function(resolve, reject) {
    makeRequest('php/getActiveGames.php', 'GET')
    .then(function(posts) {
      try {
        let games = JSON.parse(posts.responseText);
        resolve(games);
      } catch(e) { reject([]); }
    });
  });
}

function initialiseGame(PlayerID, GameName, GamePassword, scoreToWin, allowImages) {
  return new Promise(function(resolve, reject) {
    makeRequest('php/createGame.php', 'POST', JSON.stringify({
      GameOwnerID: PlayerID,
      GameName: GameName,
      GamePassword: (GamePassword==undefined ? NULL : GamePassword),
      scoreToWin: scoreToWin,
      allowImages: allowImages
    })).then(function(posts) {
      try {
        let GID = +posts.responseText;
        resolve(GID);
      } catch(e) { reject(-1); }
    }).catch(function(error) { reject(-1); });
  });
}









// Orders all players white cards[ASC]. //
function sortWhiteCards() {
  for(var i = 0, player = playerList[i]; i < playerList.length; i++)
    player.whiteCards.sort((a, b)=>(a.cardID > b.cardID)?1:((b.cardID > a.cardID)?-1:0));
}
// Sorts selection order for multiple blank black cards. //
function sortSelectionOrder() {
  for(var i = 0, playersCards = inPlayWhiteCards[i]; i < inPlayWhiteCards.length; i++)
    playersCards.sort((a, b)=>(a.selection_order > b.selection_order)?1:((b.selection_order > a.selection_order)?-1:0));
}

// Returns a random black card. //
function getBlackCard(callback) {
  $.getJSON('js/json/blackcards.json', function( data ) {
    getCardText(data, "black", function(card) {
      if(activeBlackCard != undefined) usedBlackCards.push(activeBlackCard);
      activeBlackCard = new BlackCard(card[0], card[1], card[2]);
      callback(activeBlackCard);
    });
  });
}

// Fills a players white cards at the start of game. //
function fillWhiteCards(player) {
  $.getJSON('js/json/whitecards.json', function( data ) {
    for(var i = 0; i < StartingWhiteCards; i++) {
      getCardText(data, "white", function(card) {
        var new_white_card = new WhiteCard(card[0], player.playerID, card[1]);
        player.whiteCards.push(new_white_card);
        activeWhiteCards.push(new_white_card);
      });
    }
  });
}

// Adds one white card to specified player's hand. //
function addWhiteCard(player) {
  $.getJSON('js/json/whitecards.json', function( data ) {
    getCardText(data, "white", function(card) {
      var new_white_card = new WhiteCard(card[0], player.playerID, card[1]);
      player.whiteCards.push(new_white_card);
      activeWhiteCards.push(new_white_card);
    });
  });
}

// Gets random white card text ready for card creation. //
function getCardText(data, colour, callback) {
  var randomInt, _cardID, cardIndex;
  while( true ) {
    if(colour=='white') {
      randomInt = Math.floor(Math.random() * data.WhiteCards.length) + 0;
      _cardID = data.WhiteCards[randomInt][0];
      cardIndex = activeWhiteCards.map(e => e.cardID).indexOf(_cardID);
    } else if(colour=='black') {
      randomInt = Math.floor(Math.random() * data.BlackCards.length) + 0;
      _cardID = data.BlackCards[randomInt][0];
      cardIndex = usedBlackCards.map(e => e.cardID).indexOf(_cardID);
    }
    if(cardIndex == -1) break;
  }
  if     (colour=='white') callback(data.WhiteCards[randomInt]);
  else if(colour=='black') callback(data.BlackCards[randomInt]);
}

// Creates interactive white card element for specified round type. //
function createWhiteCard(card, isCzar) {
  var _class = isCzar?'card_czar':'active_player'
  var str;
  str  = '<div class="';
  str += _class;
  str += '_white_card white_card" onclick="';
  str += isCzar?'selectWinningCard(this);':'selectWhiteCard(this);';
  str += '" cardID="';
  str += card.cardID;
  str += '"><span class="';
  str += _class;
  str += '_white_text">';
  str += card.cardText;
  str += '</span></div>'
  return str;
}

// All operations for round transition to judging round. //
function startRoundJudging() {
  activePlayer = roundCzar;

  $('div.full_window                  ').hide();
  $('div#card_czar.full_window        ').show();
  $('div#player_transition.full_window').show();
  $('div#card_czar > div#card_czar_name               ').html(activePlayer.playerName);
  $('div#card_czar > div > span#card_czar_black_text  ').html(activeBlackCard.cardText);
  $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  $('div#player_transition > h2#transition_message    ').html('...is the <strong>Card Czar</strong> for this round!!<br /><br /><br /><br />');
  $('div#player_transition > div#transition_button    ').html('Click Here to Continue...').attr({"onclick": "$(this).parent().hide();"});

  if(activeBlackCard.blankSpaces > 1) sortSelectionOrder();

  $('div#card_czar > div#card_czar_white_cards > div').html('');

  // Displays each individual players' white cards - ready for judging. //
  for(var i = 0, whiteCards = inPlayWhiteCards, str; i < whiteCards.length; i++) {
    str  = '<div class="player_selection" playerID="';
    str += whiteCards[i][0].playerID;
    str += '">';
    for(var j = 0; j < whiteCards[i].length; j++) {
      str += createWhiteCard(whiteCards[i][j], true);
    }
    str += '</div>';
    $('div#card_czar > div#card_czar_white_cards > div').append(str);
  }
}
