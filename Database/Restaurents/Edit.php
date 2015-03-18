<!DOCTYPE HTML>
<html>
    <head>
        <title>MySQLi Create Record</title>
    </head>
<body>
 
<h1>MySQLi: Update a Record</h1>
 
<?php
//include database connection
include 'main_db_connect.php';
 
// if the form was submitted/posted, update the record
if($_POST){
	 
    //write query
    $sql = "UPDATE
                menu_1
            SET
                food_name = ?,
                type = ?,
                cost  = ?,
				detail = ?
            WHERE
                food_id= ?";
 
    $stmt = $mysqli->prepare($sql);

    // you can bind params this way,
    // if you want to see the other way, see our add.php
    $stmt->bind_param(
        'sssss',
        $_POST['food_name'],
        $_POST['type'],
        $_POST['cost'],
        $_POST['detail'],
		$_POST['food_id']
    );
	
    // execute the update statement
    if($stmt->execute()){
        echo "User was updated.";
 
        // close the prepared statement
        $stmt->close();
    }else{
        die("Unable to update.");
    }


/*
 * select the record to be edited,
 * you can also use prepared statement here,
 * but my hosting provider seems it does not support the mysqli get_result() function
 * you can use it like this one http://php.net/manual/fr/mysqli.prepare.php#107568
 
 * so it I'm going to use $mysqli->real_escape_string() this time.
 */
$f=$_POST['food_id'];
$sql = "SELECT
            *
        FROM
            menu_1
        WHERE
            food_id = ".$f;
			

 
// execute the sql query
$result = $mysqli->query( $sql );
 
//get the result
$row = $result->fetch_assoc();
 
// php's extract() makes $row['firstname'] to $firstname automatically
extract($row);
 
//disconnect from database
$result->free();
$mysqli->close();
$food_name_v=$_POST['food_name'];
}
?>
 
<!--we have our html form here where new user information will be entered-->
<form action='Edit.php' method='POST' border='0'>
    <table>
        <tr>
            <td>food_id</td>
            <td><input type='text' name='food_id'  /></td>
        </tr>
        <tr>
            <td>food_name</td>
            <td><input type='text' name='food_name'  /></td>
        </tr>
        <tr>
            <td>type</td>
            <td><input type='text' name='type'   /></td>
        </tr>
        <tr>
            <td>cost</td>
            <td><input type='number_format' name='cost'   /></td>
        <tr>
		<tr>
            <td>detail</td>
            <td><input type='text' name='detail'   /></td>
        </tr>
            <td></td>
            <td>
                <!-- so that we could identify what record is to be updated -->
                <input type='hidden' name='id'  />
                <input type='submit' value='Edit' />
                <a href='Main
				.php'>Back to index</a>
            </td>
        </tr>
    </table>
</form>
 
</body>
</html>