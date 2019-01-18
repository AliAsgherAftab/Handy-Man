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
if(isset($_POST['ServiceType']))
{
	$_SESSION["TypeOfService"] = $_POST['ServiceType'];
}



// Validation
if(isset($_POST['postcode'], $_POST['phonenumber'], $_POST['whenToCallOption']))
{
	bookService($_SESSION["TypeOfService"], $_POST['postcode'], $_POST['phonenumber'], $_POST['whenToCallOption'], $_POST['imageFile'], $_POST['comment'], $email);
}
else
{
	echo json_encode($json);
}





// Tool Hired
function bookService ($serviceType, $postcode, $phonenumber, $whenToCallOption, $image, $comment, $email)
{
	$mysql_qry= "INSERT INTO servicerequest (id, ServiceType, postcode, phonenumber, whenToCallOption, image, comment, Email)
	 VALUES (NULL, '$serviceType', '$postcode', '$phonenumber', '$whenToCallOption', '$image', '$comment', '$email')";
			
	if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
		$json['response'] = "Request made successfully";
		echo json_encode($json);

	} 
	else 
	{
		$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
		echo json_encode($json);
	}
}









?>

