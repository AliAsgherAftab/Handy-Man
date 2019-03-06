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



// Validation
if(isset($_POST['signInAutomatically'], $_SESSION["Email"]))
{
    $json['response'] = "active";
    echo json_encode($json);
}
else
{
	echo json_encode($json);
}



?>

