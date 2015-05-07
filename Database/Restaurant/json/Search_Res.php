<?php

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
	$query = mysqli_query($conn, 'SELECT `user_id`,`user_name`,`user_add` FROM user WHERE user_level = 2');

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