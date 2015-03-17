<!DOCTYPE HTML>
<html>
    <head>
        <title>MySQLi: Create Record</title>
    </head>
<body>
 
<h1>MySQLi: Create Record</h1>
 
<?php
// if the form was submitted
if($_POST){
 
    // connect to database
    include 'main_db_connect.php';
	$food_id=$_POST['food_id'];
	$food_name=$_POST['food_name'];

	$cost=$_POST['cost'];
	$detail=$_POST['detail'];
	
    // sql query
    $sql = "INSERT INTO
                menu_1 (food_id, food_name, type, cost,detail)
            VALUES
                (?, ?, ?, ?,?)";;
	$query= $mysqli->query($sql);
    // if the statement was prepared
    if($stmt = $mysqli->prepare($sql) ){
 
        /*
         * bind the values,
         * "ssss" means 4 string were being binded,
         * aside from s for string, you can also use:
         * i for integer
         * d for decimal
         * b for blob
         */
        $stmt->bind_param(
            "sssss",
            $_POST['food_id'],
            $_POST['food_name'],
            $_POST['type'],
            $_POST['cost'],
			$_POST['detail']
			
	
        );
 
        // execute the insert query
        if($stmt->execute()){
            echo "User was saved.";
            $stmt->close();
        }else{
            die("Unable to save.");
        }
 
    }else{
        die("Unable to prepare statement.");
    }
 
    // close the database
    $mysqli->close();
}
 
?>
 
<!--we have our html form here where user information will be entered-->
<form action='Add.php' method='POST' border='0'>
    <table>
        <tr>
            <td>Food's ID</td>
            <td><input type='text' name='food_id' /></td>
        </tr>
        <tr>
            <td>Food's Name</td>
            <td><input type='text' name='food_name' /></td>
        </tr>
        <tr>
            <td>Type</td>
            <td><input type='text' name='type' /></td>
        </tr>
        <tr>
            <td>cost</td>
            <td><input type='number_format' name='cost' /></td>
        <tr>
		<tr>
            <td>Detail</td>
            <td><input type='Text' name='detail' /></td>
        <tr>
            <td></td>
            <td>
                <input type='submit' value='Save' />
                <a href='Main.php'>Back to index</a>
            </td>
        </tr>
    </table>
</form>
 
</body>
</html>