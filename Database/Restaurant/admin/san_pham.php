<?php

		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM san_pham INNER JOIN danh_muc ON san_pham.id_dm = danh_muc.id_dm";
		$query = mysql_query($sql);
		$num_row = mysql_num_rows($query);
		
	
?>           

		   <!-- Main Content -->
            <table width="683px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">Quản lý sản phẩm <a href="admincp.php?page=formsanpham">Thêm sản phẩm mới (+)</a></td>
                </tr>
                <tr height="30px" id="navbar-title">
                	<td width="30%">Tên sản phẩm</td>
                    <td width="15%">Giá</td>
                    <td width="15%">Loại sản phẩm</td>
                    <td width="15%">Ảnh mô tả</td>
                    <td width="5%">Sửa</td>
                    <td width="5%">Xóa</td>
                </tr>
<?php
	if($num_row>0){
		while($row = mysql_fetch_array($query)){
			
?>				
				
                 <tr class="product-item">
                	<td class="text"><?php echo $row["ten_sp"];?></td>
                    <td class="red text"><?php echo $row["gia_sp"];?> vnđ</td>
                    <td class="text"><?php echo $row["ten_dm"];?></td>
                    <td class="img"><img width="70px" src="../anh_mo_ta/<?php echo $row["anh_mo_ta"];?>" /></td>
                    <td class="link"><a href="admincp.php?page=suasanpham&id_sp=<?php echo $row['id_sp'] ?>">sửa</a></td>
                    <td class="link"><a class="red" href="admincp.php?page=xoasanpham&id_sp=<?php echo $row['id_sp']?>">xóa</a></td>
                </tr>
		
<?php
		}
	}
	else{
		echo "<script>alert('Hiện không có dữ liệu!')</script>";
	}
?>
            </table>
            <!-- End Main Content -->
