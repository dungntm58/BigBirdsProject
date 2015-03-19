<?php
	if($_POST['submit_name']){
		if($_POST['ten_dm']){
			$ten_dm=$_POST['ten_dm'];
		}
		else{
			$bao_loi="Không được để trống";
		}
		if($bao_loi){
			echo "<script>alert(\"$bao_loi\")</script>";
			echo "<meta http_equiv=\"refresh\" content=\"5;url=admincp.php?page=danhmuc\" >";
		}
		else{
			$connect_db = mysql_connect("localhost", "root", "");
			$select_db = mysql_select_db("restaurant", $connect_db);
			$sql="INSERT INTO `danh_muc`(`ten_dm`) VALUES ('$ten_dm')";
			$query=mysql_query($sql);
			header("location:admincp.php?page=danh_muc");
		}
	}
	else{
		$connect_db = mysql_connect("localhost", "root", "");
		$select_db = mysql_select_db("restaurant", $connect_db);
		$set_lang = mysql_query("SET NAMES 'utf8'");
		
		$sql = "SELECT * FROM `danh_muc`";
		$query = mysql_query($sql);
	}

?>  
			
			<!-- Main Content -->
            <form method="post">
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">Thêm mới một danh mục sản phẩm</td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Tên danh mục sản phẩm mới</label><br><input type="text" name="ten_dm" /></td>
                </tr>
                <tr height="50">
                	<td class="form"><input type="submit" name="submit_name" value="Thêm danh mục" /> <input type="reset" name="reset_name" value="Làm mới" /></td>
                </tr>
            </table>
            </form>
            <!-- End Main Content -->
