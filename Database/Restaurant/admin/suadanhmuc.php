			<?php
			error_reporting(E_NOTICE || E_WARNING);
			$id_dm = $_GET['id_dm'];
			
			
			if($_POST['submit_name']){
				$ten_dm = $_POST["ten_dm"];
				$connect_db = mysql_connect("localhost", "root", "");
				$select_db = mysql_select_db("restaurant", $connect_db);
				$sql="UPDATE `danh_muc` SET `ten_dm`='$ten_dm' WHERE id_dm = $id_dm";
				$query=mysql_query($sql);
				$id_dm;
				header("location:admincp.php?page=danh_muc");
			}
			else{
				$connect_db = mysql_connect("localhost", "root", "");
				$select_db = mysql_select_db("restaurant", $connect_db);
				$sql="SELECT * FROM `danh_muc` WHERE id_dm = $id_dm";
				$query=mysql_query($sql);
				$row=mysql_fetch_array($query);
			}
			
			
			?>
            <form method="post">
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">Thêm mới một danh mục sản phẩm</td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Tên danh mục sản phẩm mới</label><br><input type="text" name="ten_dm"  value="<?php 
					if($_POST['ten_dm']){{echo $_POST['ten_dm'];}}
					else{echo $row['ten_dm'];} ?>"/></td>
                </tr>
                <tr height="50">
                	<td class="form"><input type="submit" name="submit_name" value="Sửa danh mục" /> <input type="reset" name="reset_name" value="Làm mới" /></td>
                </tr>
            </table>
            </form>
