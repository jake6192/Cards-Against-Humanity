<?php
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);

  $GameOwnerID = $_POST['GameOwnerID'];
  $GameName = $_POST['GameName'];
  $GamePassword = $_POST['GamePassword'];
  $scoreToWin = $_POST['scoreToWin'];
  $allowImages = $_POST['allowImages'];

  $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "CardsAgainstHumanity");
  $sql = "INSERT INTO `ActiveGames` (`GameOwnerID`, `GameName`, `GamePassword`, `scoreToWin`, `allowImages`) VALUES (".$GameOwnerID.", '".$GameName."', '".$GamePassword."', ".$scoreToWin.", ".$allowImages.")";
  mysqli_set_charset($con, "utf8");
  $result = mysqli_query($con, $sql);

  if($result == 1) {
    $sql = "SELECT `GameID` FROM `ActiveGames` WHERE `GameOwnerID` = ".$GameOwnerID;
    $result = mysqli_query($con, $sql);
    $array = array();
    while($row = mysqli_fetch_assoc($result)) {
      $array[] = $row;
    }
    $sql = "UPDATE `TempUsers` SET `GameID` = '".$array[0]['GameID']."', `isGameOwner` = '1' WHERE `PlayerID` = ".$GameOwnerID;
    $result = mysqli_query($con, $sql);

    if($result == 1) echo json_encode( $array );
  };
?>
