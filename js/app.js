const StartingWhiteCards = 10;

let playerList = [], playerCount = 0;
let activeWhiteCards = [];

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


function BlackCard(cardID, playerID, cardText) {
  this.cardID = cardID;
  this.playerID = playerID;
  this.cardText = cardText;
}

/*===================*/
/* ===  Methods  === */
/*===================*/

const listPlayers=()=>console.log(playerList);


function fillWhiteCards(player) {
  $.getJSON('js/json/WhiteCards.json', function( data ) {
    for(var i = 0; i < StartingWhiteCards; i++) {
      getWhiteText(data, function(card) {
        var new_white_card = new WhiteCard(card[0], player.playerID, card[1]);
        player.whiteCards.push(new_white_card);
         activeWhiteCards.push(new_white_card);
      });
    }
  });
}
function getWhiteText(data, callback) {
  var randomInt, _cardID, cardIndex;
  var isUniqueCard = false;
  while( !isUniqueCard ) {
    randomInt = Math.floor(Math.random() * data.WhiteCards.length) + 0;
    _cardID = data.WhiteCards[randomInt][0];
    cardIndex = activeWhiteCards.map(e => e.cardID).indexOf(_cardID);

    if(cardIndex == -1) break;
  }
  callback(data.WhiteCards[randomInt]);
}


function sortWhiteCards() {
  for(var i in playerList) {
    var player = playerList[i];
    player.whiteCards.sort(function(a, b) {
      return (a.cardID > b.cardID) ? 1 : ((b.cardID > a.cardID) ? -1 : 0);
    });
  }
}
