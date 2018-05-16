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
        <h2 id="player_entry_message">Enter players' names here.</h2>
        <input type="text" id="player_entry_name_input" placeholder="Player's Name...">
        <div id="player_entry_button_container">
          <div class="button" id="player_entry_add_button" onclick="addPlayer();">Add Player</div>
          <div class="button" id="player_entry_end_button" onclick="prepareGame();">Continue</div>
        </div>
        <ul id="player_entry_player_list" style="display: none;">
          <span style="font-weight: 600; text-decoration: underline;">
            Players Ready
          </span>
        </ul>
      </div>


      <div class="full_window" id="player_transition" style="display: none;">
        <h1 id="transition_player_name"></h1>
        <h2 id="transition_message"></h2>
        <div class="button" id="transition_button"></div>
      </div>


      <div class="full_window" id="active_player" style="display: none;">
        <div id="active_player_black_card" class="black_card">
          <span id="active_player_black_text"></span>
        </div>
        <div id="active_player_white_cards">
          <div class="scroll_x_container"></div>
        </div>
      </div>


      <div class="full_window" id="card_czar" style="display: none;"></div>

    </div>

    <script type="text/javascript" src="js/libs/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
