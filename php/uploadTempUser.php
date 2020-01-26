<?php
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);
  $NAME = $_POST['name'];

  $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "CardsAgainstHumanity");
  $sql = "INSERT INTO `TempUsers` (`Name`) VALUES ('" . $NAME . "')";
  mysqli_set_charset($con, "utf8");
  $result = mysqli_query($con, $sql);

  if($result == 1) {
    $sql = "SELECT `PlayerID` FROM `TempUsers` WHERE `Name` LIKE '" . $NAME . "'";
  }
  mysqli_set_charset($con, "utf8");
  $result = mysqli_query($con, $sql);
  $array = array();
  while($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
  }
  echo json_encode( $array );
?>
