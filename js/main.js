$(document).ready(function() {
  // listPlayers();
  $('div#player_entry > input#player_entry_name_input').keydown(function( event ) {
    if(event.which===13) StartProcess();
  });
});


let PlayerID = -1, GameID = -1;
// const listPlayers    = (      ) => console.log(playerList);
// const searchPlayerID = (_ID   ) =>       playerList.filter(obj => obj.playerID ==           _ID)[0];
// const getCardOwner   = (card  ) =>       playerList.filter(obj => obj.playerID == card.playerID)[0];
// const getWhiteCard   = (cardID) => activeWhiteCards.filter(obj => obj.cardID   ==        cardID)[0];

const makeRequest = function(url, method, data) {
	var XHR = new XMLHttpRequest(); // Create the XHR request. //
	return new Promise(function(resolve, reject) { // Return it as a Promise. //
		XHR.onreadystatechange = function() { // Setup our listener to process compeleted XHR requests. //
			if(XHR.readyState !== 4) return; // Only run if the XHR request is complete. //
			else if(XHR.status >= 200 && XHR.status < 300) resolve(XHR); // Process the response if successful. //
			else reject({ // If failed. //
				status: XHR.status,
				statusText: XHR.statusText
			});
		};
		XHR.open(method || 'GET', url, true); // Setup our HTTP request. //
		XHR.send(data || null); // Send the request. //
	});
};

async function StartProcess() {
  // Upload player details to DB. //
  PlayerID = await createTempPlayer($('#player_entry_name_input').val());
  if(PlayerID !=  -1) {
    $('div.full_window               ').hide();
    $('div#game_selection.full_window').show();

    let activeGames = await getActiveGames();
    if(activeGames != []) for(let i = 0; i < activeGames.length; i++)
      $('#game_selection_button_container').append(`<div class="button${(activeGames[i].GamePassword == "") ? '' : ' private'}" id="game_selection_join${activeGames[i].GameID}_button" onclick="joinGame(${activeGames[i].GameID}, ${(activeGames[i].GamePassword == "") ? 'false' : 'true'});"><strong>${activeGames[i].GameName}</strong><br /><br />Join Game [ID : ${activeGames[i].GameID}]</div>`);
  }



  // Select the player to play the first hand. //
  activePlayer = playerList[0];
  // Select the card czar from the remaining players. //
  roundCzar = playerList[playerList.length - 1];

  // $('div.full_window                  ').hide();
  // $('div#player_transition.full_window').show();
  // $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  // $('div#player_transition > h2#transition_message    ').html('...is starting the game!<br /><br /><br /><strong>'+roundCzar.playerName+'</strong> is the Card Czar for this round<br />The Card Czar <strong>must not</strong> see anything until their turn.');
  // $('div#player_transition > div#transition_button    ').html('Click Here to Start...').attr({"onclick": "startGame();"});
}

async function createNewGame() {
  if(PlayerID != -1) {
    let GameName = $('#game_creation_name_input').val();
    let GamePassword = $('#game_creation_password_input').val();
    let scoreToWin = +$('#game_creation_scoreToWin_input').val();
    let allowImages = ($('#game_creation_allowImages_input').prop("checked") ? 1 : 0);
    let isHost = true;
    GameID = await initialiseGame(PlayerID, GameName, GamePassword, scoreToWin, allowImages);
    // joinGame(GameID, isHost) // TODO //
  }
}


function startGame() {
  getBlackCard(function(activeBlackCard) {
    $('div.full_window              ').hide();
    $('div#active_player.full_window').show();
    $('div#active_player > div#active_player_name             ').html(activePlayer.playerName);
    $('div#active_player > div > span#active_player_black_text').html(activeBlackCard.cardText);
    for(var i = 0, whiteCards = activePlayer.whiteCards; i < whiteCards.length; i++)
     $('div#active_player > div#active_player_white_cards > div').append(createWhiteCard(whiteCards[i]));
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

  $('div.full_window                  ').hide();
  $('div#player_transition.full_window').show();
  $('div#active_player.full_window    ').show();
  $('div#player_transition > h1#transition_player_name').html(activePlayer.playerName);
  $('div#player_transition > h2#transition_message    ').html('...is up next!<br /><br /><br /><br />');
  $('div#player_transition > div#transition_button    ').html('Click Here to Continue...').attr({"onclick": "$(this).parent().hide();"});

  $('div#active_player > div#active_player_name             ').html(activePlayer.playerName);
  $('div#card_czar     > div#card_czar_white_cards          ').scrollLeft(0);
  $('div#active_player > div#active_player_white_cards      ').scrollLeft(0);
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
  $(user_input).val('').focus();
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


function selectWinningCard(el) {
  if($(el).parent().hasClass('selected')) {
    $(el).parent().removeClass('selected');
    $('#card_czar_confirm_button.button').removeAttr('onclick');
    roundWinner = undefined;
    return;
  } else {
    var playerID = $(el).parent().attr('playerID');
    roundWinner = searchPlayerID(playerID);
    $(el).parent().addClass('selected');
    $('#card_czar_confirm_button.button').attr({'onclick': 'endRound();'});
  }
}


function endRound() {
  roundWinner.score++;

  var curr_playerID = roundCzar.playerID, nextID = curr_playerID+1, playerFound = false;
  while(!playerFound) {
    var search = searchPlayerID(nextID);
    if(search == undefined) nextID = 1;
    else if(playerList.length == 2) { roundCzar = search; activePlayer = searchPlayerID(2); playerFound = true; }
    else {
      roundCzar = search;
      check = searchPlayerID(nextID+1);
      activePlayer = check==undefined?searchPlayerID(1):check;
      playerFound = true;
    }
  }

  for(var i in inPlayWhiteCards) {
    var player = searchPlayerID(inPlayWhiteCards[i][0].playerID);
    for(var j in inPlayWhiteCards[i]) {
      player.whiteCards = player.whiteCards.filter(obj=>obj !== inPlayWhiteCards[i][j]);
      activeWhiteCards = activeWhiteCards.filter(obj=>obj !== inPlayWhiteCards[i][j]);
      addWhiteCard(player);
    }
  }

  let PID = roundWinner.playerID;
  inPlayWhiteCards = [];
  usedBlackCards.push(activeBlackCard);
  getBlackCard(function(activeBlackCard) {
    $('div.full_window                  ').hide();
    $('div#active_player.full_window    ').show();
    $('div#player_transition.full_window').show();

    $('div#active_player > div#active_player_name             ').html(activePlayer.playerName);
    $('div#active_player > div > span#active_player_black_text').html(activeBlackCard.cardText);
    $('div#active_player > div#active_player_white_cards > div').html('');

    $('div#player_transition > h2#transition_message                                    ').html('...is starting the next round!<br /><br /><br /><strong>'+roundCzar.playerName+'</strong> is the Card Czar for this round<br />The Card Czar <strong>must not</strong> see anything until their turn.');
    $('div#player_transition > div#transition_button                                    ').html('Click Here to Continue...').attr({"onclick": "$(this).parent().hide(); $('.winner').removeClass('winner'); roundWinner = undefined;"});
    $('div#player_transition > h1#transition_player_name                                ').html(activePlayer.playerName);
    $('div#player_transition > ul#player_transition_player_list                         ').show();
    $('div#player_transition > ul#player_transition_player_list li                      ').remove();
    for(var i in playerList) $('div#player_transition > ul#player_transition_player_list').append('<li playerID="'+playerList[i].playerID+'">'+playerList[i].playerName+' - '+playerList[i].score+'</li>');
    $('div#player_transition > ul#player_transition_player_list > li[playerID="'+PID+'"]').addClass('winner');

    for(var i = 0, whiteCards = activePlayer.whiteCards; i < whiteCards.length; i++) {
      $('div#active_player > div#active_player_white_cards > div').append(createWhiteCard(whiteCards[i]));
    }
  });
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
    nextPlayer();
  } else alert(minSelections+' white card' + (minSelections>1?'s':'') + ' needed for this round...');
}
