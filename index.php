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

      <div class="full_window" id="active_player" style="display: none;"></div>
      <div class="full_window" id="card_czar" style="display: none;"></div>

      <div class="full_window" id="player_transition">
        <h1 id="transition_player_name"></h1>
        <h2 id="transition_message"></h2>
        <div class="button" id="transition_button"></div>
      </div>

    </div>

    <script type="text/javascript" src="js/libs/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
