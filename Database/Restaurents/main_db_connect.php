<?php
$host = "localhost";
$db_name = "bbs";
$username = "root";
$password = "";
  
$mysqli = new mysqli($host, $username, $password, $db_name);
 
//check if any connection error was encountered
if(mysqli_connect_errno()) {
    echo "Error: Could not connect to database.";
    exit;
}
?>