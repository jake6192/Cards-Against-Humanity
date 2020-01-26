<?php
  $json = json_decode(file_get_contents('../js/json/whitecards.json'), true);
  $whiteCards = $json['WhiteCards'];

  for($i = 0; $i < count($whiteCards); $i++) {
    $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "CardsAgainstHumanity");
    $sql = "INSERT INTO `WhiteCards`(`CardText`) VALUES (\"" . $whiteCards[$i][1] . "\")";
    mysqli_set_charset($con, "utf8");
    $result = mysqli_query($con, $sql);
    if($result != 1) echo '0.'.$i;
  }
  echo 'fail/done'
?>
