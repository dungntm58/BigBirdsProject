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
<link rel="stylesheet" type="text/css" href="bootstrap.css" />
</head>
<body class="container">
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
		<div class="form-group text-center">
		    <h2><span class="label label-default">Đăng nhập hệ thống quản trị</span></h2>
		</div>
		<form method="post" role="form" class="form" style="position: absolute; height: 50%; top: 25%">
			<div class="form-group text-center panel" style="position:fixed; left: 33%; width: 33%;">
				<div class="panel-body">
				    <img src="images/big_bird_1.jpg" width="150px" class="pull-left" align="center" />
				    <ul class="list-group pull-left">
					    <li class="list-group-item">
					    	<label>Tài khoản</label>
					    	<br />
					    	<input type="text" name="user" class="form-control" />
					    </li>
					    <li class="list-group-item">
					    	<label>Mật khẩu</label>
					    	<br/>
					    	<input type="password" name="pass" class="form-control" />
					    </li>
					    <li class="list-group-item">
					    	<input type="submit" name="submit_name" value="Đăng Nhập" class="btn btn-primary" />
					    	<a href="formthanhvien.php"><input type="button" name="button_name" value="Đăng kí" class="btn btn-danger" /></a>
					    	<br/>
					    	<br/>
							<a href="timkiem.php">Quên mật khẩu</a>
						</li>
					</ul>
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