<html>
<head>
<title> check login </title>
</head>
<body>
<?php
session_start();
	if(isset($_POST['submit']))
	{
		$u=$p="";
		if($_POST['name'] == NULL){
			echo "Please enter your username<br/>";
		}
		else {
			$u=$_POST['name'];
			echo "check name ".$u."<br>";
		}
		
		if($_POST['pass'] == NULL) {
			echo "Please enter your password<br/>";
		}
		else {
			$p=$_POST['pass'];
			echo "check pass ".$p."<br>";
		}
		
		if($u && $p) {
			$conn= new mysqli("localhost", "root", "", "bbs") or die("can't connect this database");
			$sql= "select * from restaurant where username='".$u."' and password='".$p."'";
			$query= $conn->query($sql);
			if(!$query){
			
				echo "FUCK";
				}
			$row = $query->fetch_assoc();
			if (!$row) {
				echo "Error: ";
				
			}

			if($query->num_rows == 0) {
				echo "Username or password is not correct, please try again. reloading...";
				echo '<meta http-equiv="refresh" content="2; url=index.php">';
			}
			else {
				echo "<br><b>match. Go back HOME</b><br>";
				
				$_SESSION['admin'] = "yes";
				$_SESSION['username'] = $u;
				echo '<meta http-equiv="refresh" content="2; url=Main.php">';
			}
		}
	}

?>
</body>
</html>