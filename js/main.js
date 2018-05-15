$(document).ready(function() {
  var player1 = new Player('Jake6192');
  var player2 = new Player('OtherGuy');
  var player3 = new Player('DifferentName');

  activePlayer = player3;
  roundCzar = player1;

  listPlayers();
  prepareGame();
});


function prepareGame() {
  $('div.full_window').hide();
  $('div#player_transition.full_window').show()
  $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  $('div#player_transition > h2#transition_message').html('...is starting the game!<br/><br/><br/><strong>'+roundCzar.playerName+'</strong> is the Card Czar for this round<br/>The Card Czar <strong>must not</strong> see anything until their turn.');
  $('div#player_transition > div#transition_button').html('Click Here to Start...').attr({"onclick": "startGame();"});
}


function startGame() {
  console.log("game is now starting.");
}


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
