<?php

		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM `danh_muc`";
		//$sql = "SELECT * FROM  INNER JOIN danh_muc ON san_pham.id_dm = danh_muc_sanpham.id_dm";
		$query = mysql_query($sql);
		$num_row = mysql_num_rows($query);
		
	
?>   

  <!-- Main Content -->
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">quản lý danh mục sản phẩm <a href="admincp.php?page=formdanhmuc">thêm danh mục mới (+)</a></td>
                </tr>
                <tr height="30px" id="navbar-title">
                	<td width="90%">tên danh mục</td>
                    <td width="5%">sửa</td>
                    <td width="5%">xóa</td>
                </tr>
<?php
	if($num_row > 0){
		while($row=mysql_fetch_array($query)){

?>
                <tr class="cat-item" height="30px">
                	<td class="text"><?php echo $row['ten_dm']?></td>
                    <td class="link"><a href="admincp.php?page=suadanhmuc&id_dm=<?php echo $row['id_dm'] ?>">Sửa</a></td>
                    <td class="link"><a class="red" href="admincp.php?page=xoadanhmuc&id_dm=<?php echo $row['id_dm']?>">Xóa</a></td>
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