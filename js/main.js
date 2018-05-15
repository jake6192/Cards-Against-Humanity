$(document).ready(function() {
  var player1 = new Player('Player_1');
  var player2 = new Player('Player_2');
  var player3 = new Player('Player_3');

  listPlayers();
  sortWhiteCards();
});

function searchPlayerID(id) {
  return playerList.filter(function( obj ) {
    return obj.playerID == id;
  })[0];
}


function getCardOwner(card) {
  return playerList.filter(function( obj ) {
    return obj.playerID == card.playerID;
  })[0];
}
