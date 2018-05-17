$(document).ready(function() {
  listPlayers();
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

function getWhiteCard(cardID) {
  return activeWhiteCards.filter(function( obj ) {
    return obj.cardID == cardID;
  })[0];
}





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
  $('div#player_transition.full_window').show();
  $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  $('div#player_transition > h2#transition_message').html('...is starting the game!<br/><br/><br/><strong>'+roundCzar.playerName+'</strong> is the Card Czar for this round<br/>The Card Czar <strong>must not</strong> see anything until their turn.');
  $('div#player_transition > div#transition_button').html('Click Here to Start...').attr({"onclick": "startGame();"});
}


function startGame() {
  getBlackCard(function(activeBlackCard) {
    $('div.full_window').hide();
    $('div#active_player.full_window').show();
    $('div#active_player > div#active_player_name').html(activePlayer.playerName);
    $('div#active_player > div > span#active_player_black_text').html(activeBlackCard.cardText);
    var whiteCards = activePlayer.whiteCards;
    for(var i = 0; i < whiteCards.length; i++) {
      $('div#active_player > div#active_player_white_cards > div').append(createWhiteCard(whiteCards[i]));
    }
  });
}


function nextPlayer() {
  var curr_playerID = activePlayer.playerID, nextPlayer, foundPlayer = false;
  var nextID = curr_playerID+1;
  while(!foundPlayer) {
    nextPlayer = searchPlayerID(nextID);
         if(nextPlayer === undefined) nextID = 1;
    else if(nextPlayer === roundCzar) {
      startRoundJudging();
      return;
    } else foundPlayer = true;
  }
  activePlayer = nextPlayer;

  $('div#active_player > div#active_player_name').html(activePlayer.playerName);
  $('div#active_player > div#active_player_white_cards > div').html('');
  var whiteCards = activePlayer.whiteCards;
  for(var i = 0; i < whiteCards.length; i++) {
    $('div#active_player > div#active_player_white_cards > div').append(createWhiteCard(whiteCards[i]));
  }
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


function selectWhiteCard(el) {
  var maxSelections = activeBlackCard.blankSpaces;
  var selected = $('div.white_card.selected');

  if($(el).hasClass('selected')) {
      var selection_order = $(el).attr('selection_order');
      var elements = $('div.white_card.selected[selection_order]');

      $(el).removeClass('selected');
      for(var i = 0; i < elements.length; i++) {
        var current_order = $(elements[i]).attr('selection_order');
        if(current_order < selection_order) continue;
        $(elements[i]).attr({'selection_order': current_order-1});
      }
      $(el).removeAttr('selection_order');
  } else if(selected.length < maxSelections) {
      $(el).addClass('selected');
      selected = $('div.white_card.selected');
      $(el).attr({"selection_order": selected.length});
  }
}


function parseUserSelection() {
  var minSelections = activeBlackCard.blankSpaces;
  var selected = $('div.white_card.selected');
  if(selected.length == minSelections) {
    inPlayWhiteCards.push([]);
    var len = inPlayWhiteCards.length;
    for(var i = 0; i < selected.length; i++) {
      var card = getWhiteCard($(selected[i]).attr('cardID'));
      card.selection_order = parseInt($(selected[i]).attr('selection_order'));
      inPlayWhiteCards[len-1].push(card);
    }
  } else alert(minSelections+' white card' + (minSelections>1?'s':'') + ' needed for this round...');
  nextPlayer();
}
