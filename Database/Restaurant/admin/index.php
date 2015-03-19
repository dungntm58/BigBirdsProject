<?php
ob_start();
session_start();
error_reporting(E_NOTICE || E_WARNING);
?>
<!DOCTYPE html >
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Đăng Nhập</title>
<link rel="stylesheet" type="text/css" href="index.css" />
</head>
<body>
<?php
if($_POST["submit_name"]){
	if($_POST["user"] && $_POST["pass"]){
		$user = $_POST["user"];
		$pass = $_POST["pass"];
	
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM thanh_vien WHERE  tai_khoan = '$user' AND mat_khau = '$pass'";
		$query = mysql_query($sql);
		$num_row = mysql_num_rows($query);
		
		if($num_row > 0){
			$_SESSION["user"] = $user;
			$_SESSION["pass"] = $pass;
			header("location:admincp.php");
			//echo "hungkaka";
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
    	<td id="login-navbar" height="36px" colspan="2">Đăng nhập hệ thống quản trị</td>
    </tr>
    <tr height="50px">
    	<td id="login-key" rowspan="3" width="150px" align="center" valign="middle"><img src="images/big_bird_1.jpg" width="150px" /></td>
        <td class="login-input">Tài khoản<br /><input type="text" name="user" /></td>
    </tr>
    <tr height="50px">
        <td class="login-input">Mật khẩu<br /><input type="password" name="pass" /></td>
    </tr>
    <tr height="50px">
        <td id="login-button"><input type="submit" name="submit_name" value="Đăng Nhập" />    <a href="formthanhvien.php" /><input type="button" name="button_name" value="Đăng kí" /></a>
		<a href="timkiem.php" />Quên mật khẩu</a>
		</td>
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