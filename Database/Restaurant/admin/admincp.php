<?php
ob_start();
session_start();
error_reporting(E_NOTICE || E_WARNING);
?>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Admin Control Panel</title>
<link rel="stylesheet" type="text/css" href="admincp.css" />
<?php
switch($_GET["page"]){
case "danh_muc": echo "<link rel='stylesheet' type='text/css' href='danh_muc.css' />";
break;
			
case "san_pham": echo "<link rel='stylesheet' type='text/css' href='san_pham.css' />";
break;
			
case "thanh_vien": echo "<link rel='stylesheet' type='text/css' href='thanh_vien.css' />";
break;

case "formsanpham": echo "<link rel='stylesheet' type='text/css' href='formsanpham.css' />";
break;

case "formdanhmuc": echo "<link rel='stylesheet' type='text/css' href='formdanhmuc.css' />";
break;

case "suasanpham": echo "<link rel='stylesheet' type='text/css' href='suasanpham.css' />";
break;

case "suadanhmuc": echo "<link rel='stylesheet' type='text/css' href='suadanhmuc.css' />";
break;
			
default: echo "<link rel='stylesheet' type='text/css' href='gioithieu.css' />";
}
?>
</head>
<body>
<?php
if($_SESSION["user"] && $_SESSION["pass"]){
?>
<table id="wrapper" width="900px" border="0px" cellpadding="0px" cellspacing="0px">
	<!-- Header -->
	<tr>
    	<td colspan="2" id="header">
        	<table border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td height="30px" id="navbar">
							ADMIN CONTROL PANEL
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- End Header -->
    
    <!-- Body -->
    <tr id="body">
    	<td align="left" valign="top" width="250px">
        	<!-- Left Menu -->
            <table width="250px" class="left-menu" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr class="bg-leftbar" height="36px">
                	<td>quản lý thực đơn</td>
                </tr>
                <tr class="menu-item" height="30px">
                    <td><a href="admincp.php">Trang chủ</a></td>
                </tr>
                <tr class="menu-item" height="30px">
                    <td><a href="admincp.php?page=danh_muc">Quản lý danh mục</a></td>
                </tr>
                <tr class="menu-item" height="30px">
                    <td><a href="admincp.php?page=san_pham">Quản lý sản phẩm</a></td>
                </tr>
                <tr class="menu-item" height="30px">
                    <td><a href="admincp.php?page=thanh_vien">Quản lý người dùng</a></td>
                </tr>
            </table>
            <!-- End Left Menu -->
            
            <!-- User -->
            <table width="250px" class="left-menu" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr class="bg-leftbar" height="36px">
                	<td>thông tin đăng nhập</td>
                </tr>
                <tr height="30px">
                	<td id="user-info">Xin chào <b><?php echo $_SESSION["user"]?></b> đã đăng nhập thành công vào hệ thống quản trị!</td>
                </tr>
                <tr height="30px">
                	<td id="logout" align="right"><a href="dangxuat.php">Đăng xuất</a></td>
                </tr>
            </table>
            <!-- End User -->
        </td>
            
        <td align="right" valign="top" width="650px">
            <!-- Main Content -->
            <?php
            switch($_GET["page"]){
			case "danh_muc": include_once("danh_muc.php");
			break;
			
			case "san_pham": include_once("san_pham.php");
			break;
			
			case "thanh_vien": include_once("thanh_vien.php");
			break;
			
			case "formsanpham": include_once("formsanpham.php");
			break;
			
			case "formdanhmuc": include_once("formdanhmuc.php");
			break;
			
			case "suadanhmuc": include_once("suadanhmuc.php");
			break;
			
			case "suasanpham": include_once("suasanpham.php");
			break;
			
			case "suathanhvien": include_once("suathanhvien.php");
			break;
			
			case "xoasanpham": include_once("xoasanpham.php");
			break;
			
			case "xoadanhmuc": include_once("xoadanhmuc.php");
			break;
			
			case "xoathanhvien": include_once("xoathanhvien.php");
			break;
			
			default: include_once("gioithieu.php");
			}
			?>
            <!-- End Main Content -->
        </td>
    </tr>
    <!-- End Body -->
    
    <!-- Footer -->
    <tr height="62px">
    	<td id="footer" colspan="2" align="center" valign="middle">Copyright © 2015 BigBirds. All rights reserved.</td>
    </tr>
    <!-- End Footer -->
</table>
<?php
}
else{
	header("location:index.php");
}
?>
</body>
</html>
