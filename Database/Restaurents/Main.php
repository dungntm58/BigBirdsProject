<!DOCTYPE HTML>
<html>
    <head>
        <title>MySQLi: Read Records - code from codeofaninja.com</title>
    </head>
<body>
 
<h1>MySQLi: Read Records</h1>
 
<?php
//include database connection
include 'main_db_connect.php';
 
$action = isset($_GET['action']) ? $_GET['action'] : "";
 
//if the user clicked ok, run our delete query
if($action=='deleted'){
    echo "User was deleted.";
}
 
$query = "select * from menu_1";
$result = $mysqli->query( $query );
 
$num_results = $result->num_rows;
 
echo "<div><a href='Add.php'>Create New Record</a></div>";
 
if( $num_results ){
 
    // html table
    echo "<table border='1'>";
 
        // table heading
        echo "<tr>";
            echo "<th>food_id</th>";
            echo "<th>food_name</th>";
            echo "<th>type</th>";
			echo "<th>cost</th>";
			echo "<th>detail</th>";
            echo "<th>Action</th>";
        echo "</tr>";
 
    //loop to show each records
    while( $row = $result->fetch_assoc() ){
 
        //extract row
        //this will make $row['firstname'] to just $firstname only
        extract($row);
 
        //creating new table row per record
        echo "<tr>";
            echo "<td>{$food_id}</td>";
            echo "<td>{$food_name}</td>";
            echo "<td>{$type}</td>";
			echo "<td>{$cost}</td>";
			echo "<td>{$detail}</td>";
            echo "<td>";
                echo "<a href='edit.php?id='>Edit</a>";
                echo " / ";
 
                // delete_user is a javascript function, see at the bottom par of the page
                echo "<a href='#' onclick='delete_user( {$food_id} );'>Delete</a>";
            echo "</td>";
        echo "</tr>";
    }
 
    //end table
    echo "</table>";
 
}
 
//if table is empty
else{
    echo "No records found.";
}
 
//disconnect from database
$result->free();
$mysqli->close();
?>
 
<script type='text/javascript'>
function delete_user( id ){
 
    var answer = confirm('Are you sure?');
 
    //if user clicked ok
    if ( answer ){
        //redirect to url with action as delete and id to the record to be deleted
        window.location = 'delete.php?id=' + id;
    }
}
</script>
 
</body>
</html>