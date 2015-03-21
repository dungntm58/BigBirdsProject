

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
<link rel="stylesheet" type="text/css" href="bootstrap.css" />
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
	<form method="post" class="form">
		<nav class="navbar navbar-default nav-fixed-top">
	    	<h2 class="text-center">Đăng kí</h2>
		</nav>
		<div class="form-group panel" style="position: fixed; width: 40%; left: 30%;">
			<ul class="panel-body list-group">
				<li class="list-group-item">
					<label>Tài khoản</label>
			        <br/>
			        <input type="text" name="tai_khoan" class="form-control" />
				</li>
				<li class="list-group-item">
					<label>Mật khẩu</label>
					<br/>
					<input type="password" name="mat_khau" class="form-control"/>
				</li>
				<li class="list-group-item">
					<label>Nhập lại mật khẩu</label>
					<br/>
					<input type="password" name="mat_khau_2" class="form-control"/>
				</li>
				<li class="list-group-item">
					<label>Phân quyền</label>
					<br/>
					<select class="form-control">
						<option value="1">Member</option>
						<option value="2" selected="selected">Admin</option>
					</select>
				</li>
				<li class="list-group-item btn-group">
		        	<input type="submit" name="submit_name" value="Đăng kí" class="btn btn-info" style="width: 50%" />
		        	<input type="reset" name="reset_name" value="Làm Mới" class="btn btn-danger" style="width: 50%" />
				</li>
			</ul>
			<div class="text-center form-group"><a href="index.php"><h3>Đăng nhập</h3></a></div>
		</div>
	</form>
</body>
</html>
