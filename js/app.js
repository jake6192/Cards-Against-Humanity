const StartingWhiteCards = 10;

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

const listPlayers=()=>console.log(playerList);

function getBlackCard(callback) {
  $.getJSON('js/json/blackcards.json', function( data ) {
    getCardText(data, "black", function(card) {
      if(activeBlackCard!=undefined) usedBlackCards.push(activeBlackCard);
      activeBlackCard = new BlackCard(card[0], card[1], card[2]);
      callback(activeBlackCard);
    });
  });
}
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
function getCardText(data, colour, callback) {
  var randomInt, _cardID, cardIndex;
  var isUniqueCard = false;
  while( !isUniqueCard ) {
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


function sortWhiteCards() {
  for(var i in playerList) {
    var player = playerList[i];
    player.whiteCards.sort(function(a, b) {
      return (a.cardID > b.cardID) ? 1 : ((b.cardID > a.cardID) ? -1 : 0);
    });
  }
}


function createWhiteCard(card) {
  var str;
  str  = '<div class="active_player_white_card white_card" onclick="selectWhiteCard(this);" cardID="';
  str += card.cardID;
  str += '"><span class="active_player_white_text">';
  str += card.cardText;
  str += '</span></div>'
  return str;
}
