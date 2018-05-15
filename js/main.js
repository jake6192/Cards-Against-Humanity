$(document).ready(function() {
  // var player1 = new Player('Jake6192');
  // var player2 = new Player('OtherGuy');
  // var player3 = new Player('DifferentName');
  // activePlayer = player3;
  // roundCzar = player1;

  listPlayers();
});


function prepareGame() {
  if(playerList.length < 2) {
    alert("Not enought players to continue yet!");
    return;
  }
  // Select the player to play the first hand. //
  activePlayer = playerList[0];
  // Select the card czar from the remaining players. //
  roundCzar = playerList[playerList.length - 1];

  $('div.full_window').hide();
  $('div#player_transition.full_window').show()
  $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  $('div#player_transition > h2#transition_message').html('...is starting the game!<br/><br/><br/><strong>'+roundCzar.playerName+'</strong> is the Card Czar for this round<br/>The Card Czar <strong>must not</strong> see anything until their turn.');
  $('div#player_transition > div#transition_button').html('Click Here to Start...').attr({"onclick": "startGame();"});
}


function startGame() {
  alert("This is it.. This is the whole game :)");
}


function addPlayer() {
  if(playerList.length >= 16) {
    alert("Maximum players reached!");
    $(user_input).val('');
    return;
  }
  var user_input = $('div#player_entry > input#player_entry_name_input');
  if($(user_input).val().length<1)return; // Don't add new player if name if empty. //

  $('div#player_entry > ul#player_entry_player_list').append('<li class="player">'+$(user_input).val()+'</li>').show();
  new Player($(user_input).val());
  $(user_input).val('');
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
