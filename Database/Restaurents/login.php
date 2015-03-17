<?php
if(isset($_POST['ok']))
{
$u=$p="";
 if($_POST['username'] == NULL)
 {
  echo "Please enter your username<br />";
 }
 else
 {
  $u=$_POST['username'];
 }
 if($_POST['password'] == NULL)
 {
  echo "Please enter your password<br />";
 }
 else
 {
  $p=$_POST['password'];
 }
 if($u && $p)
 {
  $conn=mysqli_connect("localhost","root","") or die("can't connect this database");
  mysqli_select_db("bbs",$conn);
  $sql="select * from restaurant where username='".$u."' and password='".$p."'";
  $query=mysqli_query($sql);
  if(mysqli_num_rows($query) == 0)
  {
   echo "Username or password is not correct, please try again";
  }
  else
  {
   $row=mysqli_fetch_array($query);
   session_start();
   $_SESSION['userid'] = $row[id];
   $_SESSION['level'] = $row[level];
  
  }
 }
}
?>
<form action='login.php' method='post'>
Username: <input type='text' name='username' size='25' /><br />
Password: <input type='password' name='password' size='25' /><br />
<input type='submit' name='ok' value='Dang Nhap' />
</form>