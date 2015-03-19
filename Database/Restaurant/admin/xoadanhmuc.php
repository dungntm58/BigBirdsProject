<?php
	$id_dm=$_GET['id_dm'];
	
	$connect_db=mysql_connect("localhost","root","");
	$select_db=mysql_select_db("restaurant",$connect_db);
	
	$sql="DELETE FROM `danh_muc` WHERE id_dm=$id_dm";
	$query=mysql_query($sql);
	
	header("location:admincp.php?page=danh_muc");
?>