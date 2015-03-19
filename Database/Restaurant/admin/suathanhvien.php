			<?php
			error_reporting(E_NOTICE || E_WARNING);
			$id_thanhvien = $_GET['id_thanhvien'];
			
			
			if($_POST['submit_name']){
				$tai_khoan = $_POST["tai_khoan"];
				$mat_khau = $_POST['mat_khau'];
				$phan_quyen = $_POST['phan_quyen'];
				$connect_db = mysql_connect("localhost", "root", "");
				$select_db = mysql_select_db("restaurant", $connect_db);
				$sql="UPDATE `thanh_vien` SET `tai_khoan`='$tai_khoan', `mat_khau` = '$mat_khau', `phan_quyen` = $phan_quyen WHERE id_thanhvien = $id_thanhvien";
				$query=mysql_query($sql);
				$id_dm;
				header("location:admincp.php?page=thanh_vien");
			}
			else{
				$connect_db = mysql_connect("localhost", "root", "");
				$select_db = mysql_select_db("restaurant", $connect_db);
				$sql="SELECT * FROM `thanh_vien` WHERE id_thanhvien = $id_thanhvien";
				$query=mysql_query($sql);
				$row=mysql_fetch_array($query);
			}
			
			
			?>
            <form method="post">
            <table width="640px" id="main-content" border="0px" cellpadding="0px" cellspacing="0px">
            	<tr id="main-navbar" height="36px">
                	<td colspan="6">Sửa thông tin thành viên</td>
                </tr>
                <tr height="50">
                	<td class="form"><label>Tên tài khoản</label><br><input type="text" name="tai_khoan"  value="<?php 
					if($_POST['tai_khoan']){{echo $_POST['tai_khoan'];}}
					else{echo $row['tai_khoan'];} ?>"/></td>
                </tr>
				<tr height="50">
                	<td class="form"><label>Mật khẩu</label><br><input type="text" name="mat_khau"  value="<?php 
					if($_POST['mat_khau']){{echo $_POST['mat_khau'];}}
					else{echo $row['mat_khau'];} ?>"/></td>
                </tr>
				
				<tr height="50">
				<td class="form"><label>Phân quyền</label><br />
					<select name="phan_quyen">
						<option <?php if($row['phan_quyen'] == 1){echo "selected=selected";}?> value="1">Member</option>
						<option <?php if($row['phan_quyen'] == 2){echo "selected=selected";}?> value="2">Admin</option>
					</select>
				</td>
				
			</tr>
				
                <tr height="50">
                	<td class="form"><input type="submit" name="submit_name" value="Sửa thành viên" /> <input type="reset" name="reset_name" value="Làm mới" /></td>
                </tr>
            </table>
            </form>
