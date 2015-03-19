<?php

		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM `thanh_vien`";
		$query = mysql_query($sql);
		$num_row = mysql_num_rows($query);
		
	
?>   

  <!-- Main Content -->
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="5">Quản lí thành viên </td>
                </tr>
                <tr height="30px" id="navbar-title">
                	<td width="50%">Tên tài khoản</td>
					<td width="30%">Mật khẩu</td>
					<td width="10%">Phân quyền</td>
                    <td width="5%">sửa</td>
                    <td width="5%">xóa</td>
                </tr>
<?php
	if($num_row > 0){
		while($row=mysql_fetch_array($query)){

?>
                <tr class="cat-item" height="30px">
                	<td class="text"><?php echo $row['tai_khoan']?></td>
					<td class="text"><?php echo $row['mat_khau']?></td>
					<td class="text"><?php echo $row['phan_quyen']?></td>
                    <td class="link"><a href="admincp.php?page=suathanhvien&id_thanhvien=<?php echo $row['id_thanhvien'] ?>">Sửa</a></td>
                    <td class="link"><a class="red" href="admincp.php?page=xoathanhvien&id_thanhvien=<?php echo $row['id_thanhvien']?>">Xóa</a></td>
                </tr>
<?php
		}
	}
	else{
		echo "<script>Alert('Không có dữ liệu!')</script>";
	}

?>                
            </table>
            <!-- End Main Content -->