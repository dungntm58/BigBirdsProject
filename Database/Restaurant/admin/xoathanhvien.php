<?php
	$id_thanhvien=$_GET['id_thanhvien'];
	
	$connect_db=mysql_connect("localhost","root","");
	$select_db=mysql_select_db("restaurant",$connect_db);
	
	$sql="DELETE FROM `thanh_vien` WHERE id_thanhvien=$id_thanhvien";
	$query=mysql_query($sql);
	
	header("location:admincp.php?page=thanh_vien");
?>