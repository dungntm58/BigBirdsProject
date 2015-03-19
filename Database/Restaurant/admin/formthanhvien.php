

<?php
ob_start();
session_start();
error_reporting(E_NOTICE || E_WARNING);
?>
<!DOCTYPE html >
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Đăng kí</title>
<link rel="stylesheet" type="text/css" href="formthanhvien.css" />
</head>
<body>
<?php
	error_reporting(E_NOTICE || E_WARNING);
	if($_POST['submit_name']){
		$phan_quyen = $_POST['phan_quyen'];
		if($_POST['tai_khoan']){
			$tai_khoan=$_POST['tai_khoan'];
		}
		else{
			$bao_loi="Không được để trống";
		}
		if($_POST['mat_khau']){
			$mat_khau=$_POST['mat_khau'];
		}
		else{
			$bao_loi="Không được để trống";
		}
		if($_POST['mat_khau'] != $_POST['mat_khau_2']){
			$bao_loi="2 mật khẩu không giống nhau";
		}
		if($bao_loi){
			echo "<script>alert(\"$bao_loi\")</script>";
			echo "<meta http_equiv=\"refresh\" content=\"5;url=admincp.php?page=danhmuc\" >";
		}
		else{
			$connect_db = mysql_connect("localhost", "root", "");
			$select_db = mysql_select_db("restaurant", $connect_db);
			$sql="INSERT INTO `thanh_vien`(`tai_khoan`,`mat_khau`,`phan_quyen`) VALUES ('$tai_khoan','$mat_khau','$phan_quyen')";
			$query=mysql_query($sql);
			header("location:admincp.php?page=index");
		}
	}
	else{
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM `thanh_vien`";
		$query = mysql_query($sql);
	}

?>

  <!-- Main Content -->
  
			<form method="post">
<table id="login-main" border="0px" cellpadding="0px" cellspacing="0px">
	<tr>
    	<td id="login-navbar" height="36px" colspan="2">Đăng Kí</td>
    </tr>
    <tr height="50px">
    	<td id="login-key" rowspan="3" width="150px" align="center" valign="middle"><img src="images/big_bird_1.jpg" width="150px" /></td>
        <td class="login-input">Tài khoản<br /><input type="text" name="tai_khoan" /></td>
    </tr>
    <tr height="50px">
        <td class="login-input">Mật khẩu<br /><input type="password" name="mat_khau" /></td>
    </tr>
	
	<tr height="50px">
        <td class="login-input">Nhập lại mật khẩu<br /><input type="password" name="mat_khau_2" /></td>
    </tr>
	
	
	<tr height="50">
				<td></td>
				<td class="login-input"><label>Phân quyền</label><br />
					<select name="phan_quyen">
						<option value="1">Member</option>
						<option value="2">Admin</option>
					</select>
				</td>
	</tr>
	
    <tr height="50px">
		<td></td>
        <td id="login-button"><input type="submit" name="submit_name" value="Đăng kí" /> <input type="reset" name="reset_name" value="Làm Mới" /></td>
    </tr>
</table>
</form>

</body>
</html>
