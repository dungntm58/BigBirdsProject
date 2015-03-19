<?php
session_start();
if($_SESSION["user"] && $_SESSION["pass"]){
	session_destroy();
	header("location:index.php");
}
else{
	header("location:index.php");
}
?>