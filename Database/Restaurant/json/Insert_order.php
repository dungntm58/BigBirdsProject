<?php
	
	error_reporting(E_NOTICE || E_WARNING);
	
	$string = file_get_contents("php://input");
	$json = json_decode($string,true);//chuyển $json thành mảng
	
	//$user_id = array(); // khai báo mảng user_id chưa các id
	
	
	$dishes = array();
	$quantity = array();
	foreach($json as $key => $value) {
		if (is_array($value)) {
			foreach ($value as $key => $value) {
				if($key =='dishes'){
					$dishes[]= $value;
				}
				
				else if($key == 'quantity'){
					$quantity[] = $value;
				}
				else if($key == 'table'){
					$or_table = $value;
				}
				else{
					$day = $value;
				}
			}
		}
    }
	

		$length = count($dishes);
		$date = substr($day, 0, 10);
		$hour = (int)substr($day,11,2);
		$min = (int)substr($day,14,2);
		$sec = (int)substr($day,17,2);
		$time = $hour*3600 + $min*60 + $sec;
		//echo $time;

		//echo $quantity[1];
	
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
	$query = mysqli_query($conn, "INSERT INTO `order`(`or_table`, `or_date`, `or_time`) VALUES ('$or_table','$date','$time')");
	
	//var_dump($query);
	
	if (!$query) {
		printf("Error: %s\n", mysqli_error($conn));
		exit();
	}

	
	for($i=0;$i<$length;$i++){
		$query_1 = mysqli_query($conn, "INSERT INTO `order_detail`(`dishes`, `quantity`) VALUES ('$dishes[$i]','$quantity[$i]')");
	}
	
	
	if (!$query_1) {
		printf("Error: %s\n", mysqli_error($conn));
		exit();
	}
	
	mysqli_close($conn);
?>