<?php
?>

<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Jake's CaH</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/font.css">
  </head>
  <body>
    <div id="main_container">

      <div class="full_window" id="player_entry">
        <h2 id="player_entry_message">Enter your name here.</h2>
        <input type="text" id="player_entry_name_input" placeholder="Player Name...">
        <div id="player_entry_button_container">
          <div class="button" id="player_entry_end_button" onclick="StartProcess();">Continue</div>
        </div>
      </div>


      <div class="full_window" id="game_selection" style="display: none;">
        <h2 id="game_selection_message">Select a game to join or create a new game room.</h2>
        <div id="game_selection_button_container">
          <div class="button" id="game_selection_create_button" onclick="$('div.full_window').hide(); $('div#game_creation.full_window').show();">Create Game</div>
        </div>
      </div>


      <div class="full_window" id="game_creation" style="display: none;">
        <h2 id="game_creation_message">Enter game name :</h2>
        <input type="text" id="game_creation_name_input" placeholder="Player Name...">
        <h2 id="game_creation_label_pw">Enter game password :</h2>
        <input type="password" id="game_creation_password_input" placeholder="(Leave blank for public game)">
        <h2 id="game_creation_label_stw">Score to win :</h2>
        <input type="number" id="game_creation_scoreToWin_input" value="10">
        <div>allowImages : <input type="checkbox" id="game_creation_allowImages_input" /></div>
        <div id="game_creation_button_container">
          <div class="button" id="game_creation_create_button" onclick="createNewGame();">Create Game</div>
          <div class="button" id="game_creation_cancel_button" onclick="$('div.full_window').hide(); $('div#game_selection.full_window').show();">Cancel</div>
        </div>
      </div>


      <div class="full_window" id="player_transition" style="display: none;">
        <ul id="player_transition_player_list" style="display: none;">
          <span style="font-weight: 600; text-decoration: underline;">
            Scoreboard:
          </span>
        </ul>
        <h1 id="transition_player_name"></h1>
        <h2 id="transition_message"></h2>
        <div class="button" id="transition_button"></div>
      </div>


      <div class="full_window" id="active_player" style="display: none;">
        <div id="active_player_black_card" class="black_card">
          <span id="active_player_black_text"></span>
        </div>

        <div class="button" id="active_player_confirm_button" onclick="parseUserSelection();">
          Confirm Selection
        </div>

        <div id="active_player_name"></div>

        <div id="active_player_white_cards">
          <div class="scroll_x_container"></div>
        </div>
      </div>


      <div class="full_window" id="card_czar" style="display: none;">
        <div id="card_czar_black_card" class="black_card">
          <span id="card_czar_black_text"></span>
        </div>

        <div id="card_czar_white_cards">
          <div class="scroll_x_container"></div>
        </div>

        <div class="button" id="card_czar_confirm_button" onclick="">
          Confirm Selection
        </div>

        <div id="card_czar_name"></div>
      </div>

    </div>

    <script type="text/javascript" src="js/libs/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
