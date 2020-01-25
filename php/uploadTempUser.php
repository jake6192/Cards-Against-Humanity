<?php
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);
  $NAME = $_POST['name'];

  $con = mysqli_connect("localhost", "debian-sys-maint", "1gwKkXCpStswPrcx", "ActiveGame");
  $sql = "INSERT INTO `TempUsers` (`Name`, `RoundScore`) VALUES ('" . $NAME . "', 0)";
  mysqli_set_charset($con, "utf8");
  $result = mysqli_query($con, $sql);
  echo $result;
  
  // $array = array();
  // while($row = mysqli_fetch_assoc($result)) {
  //   $array[] = $row;
  // }
  // // echo json_encode( $array );
?>
