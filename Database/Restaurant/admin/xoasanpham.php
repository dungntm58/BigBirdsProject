<?php
	$id_sp=$_GET['id_sp'];
	$connect_db = mysql_connect("localhost", "root", "");
	$select_db = mysql_select_db("restaurant", $connect_db);
	$set_lang = mysql_query("SET NAMES 'utf8'");
	$sql="DELETE FROM `san_pham` WHERE id_sp=$id_sp";
	$query=mysql_query($sql);
	header("location:admincp.php?page=san_pham");
?>