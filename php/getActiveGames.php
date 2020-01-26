<?php
  $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "CardsAgainstHumanity");
  $sql = "SELECT * FROM `ActiveGames`";
  mysqli_set_charset($con, "utf8");
  $result = mysqli_query($con, $sql);
  $array = array();
  while($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
  }
  echo json_encode( $array );
?>
