<?php

// Start of session
session_start();

// Creating a new php file
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once ('config.php');
$json = array();
$json=array('response' => 'error',
                'data'=> '0'
);


$email = $_SESSION["Email"];


// Validation
if(isset($_POST['new_password']))
{
	changePassword($_POST['new_password'], $email);
}
else
{
    echo json_encode($json);
}



// Forget Password
function changePassword ($new_password, $email)
{
		$mysql_qry= "UPDATE customer SET Password = '$new_password' WHERE customer.Email = '$email'";
			
		if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
		{
			$json['response'] = "Password changed successfully";
			echo json_encode($json);
		} 
		else 
		{
			$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
			echo json_encode($json);
		}
}






?>

