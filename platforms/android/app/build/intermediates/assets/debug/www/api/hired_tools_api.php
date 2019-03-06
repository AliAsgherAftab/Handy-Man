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
if(isset($_POST['ToolValue'], $_POST['ToolPrice']))
{
	$_SESSION["HiredTool"] = $_POST['ToolValue'];
	$_SESSION["HiredToolPrice"] = $_POST['ToolPrice'];
}



// Validation
if(isset($_POST['startdate'], $_POST['enddate'], $_POST['option'], $_POST['postcode'], $_POST['differenceInDays']))
{
	$_SESSION["HiredToolStartDate"] = $_POST['startdate'];
	$_SESSION["HiredToolEndDate"] = $_POST['enddate'];
	$_SESSION["HiredToolOption"] = $_POST['option'];
	$_SESSION["HiredToolPostCode"] = $_POST['postcode'];
	$_SESSION["HiredToolDifferenceInDays"] = $_POST['differenceInDays'];
}




// Validation
if(isset($_POST['status']) && $_POST['status'] == 'completed')
{
	$totalPrice = $_SESSION["HiredToolPrice"] * $_SESSION["HiredToolDifferenceInDays"];

	completed($_SESSION["HiredTool"], $totalPrice, $_SESSION["HiredToolStartDate"], $_SESSION["HiredToolEndDate"],
				$_SESSION["HiredToolOption"], $_SESSION["HiredToolPostCode"], $email);
}
else
{
	echo json_encode($json);
}





// Tool Hired
function completed ($tool, $price, $startdate, $enddate, $option, $postcode, $email)
{
	$mysql_qry= "INSERT INTO hiretools (id, Tool, Price, StartDate, EndDate, ToolOption, PostCode, Email)
	 VALUES (NULL, '$tool', '$price', '$startdate', '$enddate', '$option', '$postcode', '$email')";
			
	if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
		$json['response'] = "Tool hired successfully";
		echo json_encode($json);
	} 
	else 
	{
		$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
		echo json_encode($json);
	}
}









?>

