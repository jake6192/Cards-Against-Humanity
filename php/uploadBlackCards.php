<?php
  $json = json_decode(file_get_contents('../js/json/blackcards.json'), true);
  $blackCards = $json['BlackCards'];

  for($i = 0; $i < count($blackCards); $i++) {
    $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "CardsAgainstHumanity");
    $sql = "INSERT INTO `BlackCards`(`CardText`, `BlankSpaces`) VALUES (\"" . $blackCards[$i][1] . "\", " . $blackCards[$i][2] . ")";
    mysqli_set_charset($con, "utf8");
    $result = mysqli_query($con, $sql);
    if($result != 1) echo '0.'.$i;
  }
  echo 'fail/done';
?>
