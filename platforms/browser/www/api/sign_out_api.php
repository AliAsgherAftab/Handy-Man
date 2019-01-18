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
if(isset($_POST['signout']) && $_POST['signout'] == 'out')
{
	// remove all session variables
	session_unset(); 

	// destroy the session 
	session_destroy();

	$json['response'] = "successful sign out";
    echo json_encode($json);
}
else
{
	$json['response'] = $email;
    echo json_encode($json);
}




?>

