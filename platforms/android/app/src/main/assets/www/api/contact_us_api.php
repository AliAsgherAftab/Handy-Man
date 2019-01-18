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
if(isset($_POST['contact_message']))
{
	contactUs ($_POST['contact_message'], $email);
}
else
{
	echo json_encode($json);
}





// contact us
function contactUs ($message, $email)
{
	$mysql_qry= "INSERT INTO contactus (id, message, Email) VALUES (NULL, '$message', '$email')";
			
	if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
		$json['response'] = "Message sent successfully";
		echo json_encode($json);
	} 
	else 
	{
		$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
		echo json_encode($json);
	}
}







?>

