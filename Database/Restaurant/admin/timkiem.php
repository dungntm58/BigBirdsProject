<?php
ob_start();
session_start();
error_reporting(E_NOTICE || E_WARNING);
?>
<!DOCTYPE html >
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Quên mật khẩu</title>
<link rel="stylesheet" type="text/css" href="index.css" />
</head>
<body>
<?php
if($_POST["submit_name"]){
	if($_POST["tai_khoan"] ){
		$tai_khoan = $_POST["tai_khoan"];
	
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM thanh_vien WHERE  `tai_khoan` = '$tai_khoan'";
		$query = mysql_query($sql);
		$num_row = mysql_num_rows($query);
		
		if($num_row > 0){
			$sql1= "SELECT `mat_khau` FROM thanh_vien WHERE  tai_khoan = '$tai_khoan'";
			$query1 = mysql_query($sql);
			$row = mysql_fetch_array($query1);
			$bao_loi = $row['mat_khau'];
			echo "<script>alert('Mật khẩu của bạn là: $bao_loi')</script>";
		}
		else{
			echo "<script>alert('Tài khoản không hợp lệ!')</script>";
		}
	}
}
?>
<?php
if(!$_SESSION['user'] && !$_SESSION['pass']){
?>
<form method="post">
<table id="login-main" border="0px" cellpadding="0px" cellspacing="0px">
	<tr>
    	<td id="login-navbar" height="36px" colspan="2">Tìm tài khoản của bạn</td>
    </tr>
    <tr height="50px">
    	<td id="login-key" rowspan="3" width="150px" align="center" valign="middle"><img src="images/big_bird_1.jpg" width="150px" /></td>
        <td class="login-input">Nhập vào tên tài khoản<br /><input type="text" name="tai_khoan" /></td>
    </tr>
	
	 
	
   
    <tr height="50px">
        <td id="login-button"><input type="submit" name="submit_name" value=" Tìm lại mật khẩu " /> <a href="index.php" /><input type="button" name="button_name" value=" Hủy " /></td>
    </tr>
</table>
</form>
<?php
}
else{
	header("location:admincp.php");
}
?>
</body>
</html>