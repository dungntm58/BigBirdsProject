<?php
	
	error_reporting(E_NOTICE || E_WARNING);
	
	$string = file_get_contents("php://input");
	$json = json_decode($string,true);//chuyển $json thành mảng
	
	//$user_id = array(); // khai báo mảng user_id chưa các id
	
	foreach($json as $key => $value) {
		if (is_array($value)) {
			foreach ($value as $key => $value) {
				if($key =='resID'){
					$id= $value;
					//echo $user_id."<br />";
				}
				else{
					$day = $value;
				}
			}
		}
    }
		$date = substr($day, 0, 10);
		
		$hour = substr($day,11, 8);
		$hour1 = strtotime($hour);
		$hour2 = strtotime("+2 hours",$hour1);

		$hour3 = strtotime($hour);
		$hour4 = strtotime("-2 hours",$hour1);
		
	
	$db_user = 'root'; //User đăng nhập MYSQL
	$db_pass = ''; // Pass đăng nhập MySQL
	$db_host = 'localhost'; //IP, Domain kết nối
	$db_name = 'restaurant_db'; //Tên CSDL
	
	
	//Tạo biến kết nối với CSDL
	$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name) or die('Kết nối thất bại');

	//Lấy kiểu định dạng muốn lấy của request
	$formatList = array('json', 'xml');
	
	if (isset($_GET['format'])) {
		$format = $_GET['format'];
	} else {
		$format = 'json';
	}
	if (!in_array($format, $formatList)) {
		$format = 'json';
	}

	//Truy vấn
	$query = mysqli_query($conn, 'SELECT `table_id`,`table_content` FROM `table` WHERE table_id NOT IN (SELECT `or_table` FROM `order` WHERE order.or_table = table.table_id AND or_date = '.$date.' AND or_time < '.$hour2.' AND or_time > '.$hour4.')');
	
	//var_dump($query);
	
	
	if (!$query) {
		printf("Error: %s\n", mysqli_error($conn));
		exit();
	}

	//Tạo bảng lưu thông tin
	$users = array();
	while ($user_ar = mysqli_fetch_assoc($query)) {
		$users[] = $user_ar;
	}

	//Trả về kiểu json
	if ($format == 'json') {
		header('Content-type: application/json; charset=utf-8');
		echo json_encode($users);
	}


	mysqli_close($conn);
?>