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
<link rel="stylesheet" type="text/css" href="bootstrap.css" />
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
			<nav class="navbar navbar-default nav-fixed-top">
			    <h2 class="text-center">Tìm tài khoản</h2>
			</nav>
			<form method="post" class="form-group" style="position: absolute; height: 50%; top: 25%">
				<div class="form-group panel" style="position: fixed; width: 40%; left: 30%;">
					<div class="panel-body">
						<img src="images/big_bird_1.jpg" width="30%" class="pull-left" /></td>
						<div class="pull-left" style="width: 70%">
							<strong><h4>Nhập vào tên tài khoản</h4></strong>
							<input type="text" name="tai_khoan" class="form-control" />
							<br/>
							<div align="center" class="btn-group">
								<input type="submit" name="submit_name" value=" Tìm lại mật khẩu " class="btn btn-default" />
								<a href="index.php" type="button" class="btn btn-danger">Hủy</a>
							</div>
						</div>
					</div>
				</div>
			</form>
		<?php
		}
		else{
			header("location:admincp.php");
		}
	?>
</body>
</html>