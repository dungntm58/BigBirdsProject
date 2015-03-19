<?php
	if($_POST['submit_name']){
		if($_POST['ten_sp']){
			$ten_sp = $_POST['ten_sp'];
		}
		else{
			$bao_loi = "Không được để trống trường nội dung nào!";
		}
		if($_POST['gia_sp']){
			$gia_sp = $_POST['gia_sp'];
		}
		else{
			$bao_loi = "Không được để trống trường nội dung nào!";
		}
		if($_POST['id_dm'] !=0){
			$id_dm = $_POST['id_dm'];
		}
		else{
			$bao_loi = "Không được để trống trường nội dung nào!";
		}
		if($_FILES["image_upload"]["name"]){
			$image_name = $_FILES["image_upload"]["name"];
			$image_path = $_FILES["image_upload"]["tmp_name"];
		}
		else{
			$bao_loi = "Không được để trống trường nội dung nào!";
		}
		if($_POST['mo_ta']){
			$mo_ta = $_POST['mo_ta'];
		}
		else{
			$bao_loi = "Không được để trống trường nội dung nào!";
		}
		if($bao_loi){
			echo "<script>alert(\"$bao_loi\")</script>";
			echo "<meta http_equiv=\"refresh\" content=\"5;url=admincp.php?page=formsanpham\" />";
		}
		else{
			
			
			$new_image_path ="../anh_mo_ta/".$image_name;
			$image_upload = move_uploaded_file($image_path, $new_image_path);
			
			$connect_db = mysql_connect("localhost", "root", "");
			$select_db = mysql_select_db("restaurant", $connect_db);
			$sql="INSERT INTO `san_pham`(`ten_sp`, `mo_ta`, `anh_mo_ta`, `gia_sp`, `id_dm`) VALUES ('$ten_sp','$mo_ta','$image_name','$gia_sp','$id_dm')";
			$query = mysql_query($sql);
			header("location:admincp.php?page=san_pham");
			
		}
	}
	else{
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM danh_muc";
		$query = mysql_query($sql);
	}
		
		
	
?>   

  <!-- Main Content -->
            <form method="post" enctype="multipart/form-data">
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">Thêm một sản phẩm mới</td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Tên của sản phẩm</label><br><input type="text" name="ten_sp" /></td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Giá của sản phẩm</label><br><input type="text" name="gia_sp" /></td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Sản phẩm thuộc danh mục</label><br>
                    	<select name="id_dm">
                        	<option selected="selected">--- Lựa chọn danh mục ---</option>
							<?php
								while($row=mysql_fetch_array($query)){
							?>
                        	<option value="<?php echo $row['id_dm']?>"><?php echo $row['ten_dm']?></option>
                            <?php
								}
							?>
                        </select>                    	
                    </td>
                </tr>
                <tr height="50">
                	<td class="form"><label>ảnh mô tả cho sản phẩm</label><br><input type="file" name="image_upload" /></td>
                </tr>
                <tr>
                	<td class="form"><label>Nội dung chi tiết của sản phẩm</label><br><textarea name="mo_ta"></textarea></td>
                </tr>
               
                <tr height="50">
                	<td class="form"><input type="submit" name="submit_name" value=" Thêm sản phẩm " /> <input type="reset" name="reset_name" value=" Làm mới " /></td>
                </tr>
            </table>
            </form>
            <!-- End Main Content -->
