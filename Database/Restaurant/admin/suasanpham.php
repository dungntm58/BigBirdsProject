<?php
	error_reporting(E_NOTICE || E_WARNING);
	$id_sp = $_GET['id_sp'];
	if($_POST['submit_name']){
		$ten_sp = $_POST["ten_sp"];
		$gia_sp = $_POST["gia_sp"];
		$id_dm = $_POST["id_dm"];
		$mo_ta = $_POST["mo_ta"];
		
		if($_FILES["image_upload"]["name"]){
		$image_name = $_FILES["image_upload"]["name"];
		$image_path = $_FILES["image_upload"]["tmp_name"];
		$new_image_path = "../anh_mo_ta/".$image_name;
		$image_upload = move_uploaded_file($image_path, $new_image_path);
		}
		else{
			$image_name = $_POST["anh_mo_ta"];
		}
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		$sql = "UPDATE san_pham SET ten_sp='$ten_sp', gia_sp=$gia_sp, id_dm=$id_dm, mo_ta='$mo_ta', `anh_mo_ta`='$image_name' WHERE id_sp=$id_sp";
		$query = mysql_query($sql);
		header("location:admincp.php?page=san_pham");
	}
	else{
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$sql="SELECT * FROM san_pham WHERE id_sp = $id_sp";
		$query=mysql_query($sql);
		$row=mysql_fetch_array($query);
		
		$sql_2="SELECT * FROM danh_muc";
		$query_2=mysql_query($sql_2);
	}

?>


            <!-- Main Content -->
            <form method="post">
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">thêm một sản phẩm mới</td>
                </tr>
                <tr height="50">
                	<td class="form"><label>tên của sản phẩm</label><br><input value=
					"<?php 
					if($_POST['ten_sp']){{echo $_POST['ten_sp'];}}
					else{echo $row['ten_sp'];} ?>" type="text" name="ten_sp"  /></td>
                </tr>
                <tr height="50">
                	<td class="form"><label>giá của sản phẩm</label><br><input value="<?php
					if($_POST['gia_sp']){
					{echo $_POST['gia_sp'];}}
					else{
						echo $row['gia_sp'];
						} 
					?>" type="text" name="gia_sp" /></td>
                </tr>
                <tr height="50">
                	<td class="form"><label>sản phẩm thuộc danh mục</label><br>
                    	<select name="id_dm">
						
                        	<option selected="selected">--- lựa chọn danh mục ---</option>
                        <?php
							while($row2=mysql_fetch_array($query_2)){
						?>
							<option <?php if($row2['id_dm'] == $row['id_dm']){echo "selected='selected'";}?> value="<?php echo $row2['id_dm'];?>"><?php echo $row2['ten_dm'];?></option>
						<?php
							}
						?>						
						>
                        </select>                    	
                    </td>
                </tr>
                <tr height="50">
                	<td class="form"><label>ảnh mô tả cho sản phẩm</label><br><input type="file" name="image_upload" /><input type="hidden" name="anh_mo_ta" value="<?php echo $row["anh_mo_ta"];?>" /></td>
                </tr>
                <tr>
                	
					<td class="form"><label>nội dung chi tiết của sản phẩm</label><br><textarea name="mo_ta"><?php if($_POST["mo_ta"]){echo $_POST["mo_ta"];}else{echo $row["mo_ta"];}?></textarea></td>
                </tr>
                <tr height="50">
                	<td class="form"><input type="submit" name="submit_name" value="Sửa sản phẩm" /> <input type="reset" name="reset_name" value="Làm mới" /></td>
                </tr>
            </table>
            </form>
            <!-- End Main Content -->
