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
if(isset($_POST['username'],$_POST['email'],$_POST['password']))
{
    registerUsers($_POST['username'],$_POST['email'],$_POST['password']);
}
else if(isset($_POST['forget_email'],$_POST['new_password']))
{
	forgetPassword($_POST['forget_email'],$_POST['new_password']);
}
else if (isset($_GET['show_user']) && $_GET['show_user'] == 'show')
{	
    login($_GET['log_email'], $_GET['pass']);
}
else if(isset($_GET['validEmail']) && $_GET['validEmail'] == 'email')
{	
    emailVerification ($_GET['email']);
}
else
{
    echo json_encode($json);
}



// Customer Registration
function registerUsers ($username, $email, $password)
{
		$mysql_qry= "INSERT INTO customer (Username, Email, Password) VALUES ('$username','$email', '$password')";
			
		if (mysqli_query($GLOBALS['cont'], $mysql_qry)) 
		{
			$json['response'] = "New record created successfully";
			echo json_encode($json);

		} 
		else 
		{
			$json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
			echo json_encode($json);
		}
}


// Forget Password
function forgetPassword ($email, $new_password)
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


// Login
function login ($email, $password)
{
    $mysql_qry= "SELECT * FROM customer WHERE Email='$email' AND Password='$password'";
	
    if ($result= mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
        $num_of_rows = $result->num_rows;
        $tem_arr= array();
		
        if ($num_of_rows>0)
		{
            while ($row= mysqli_fetch_assoc($result))
			{
                $tem_arr[]= $row;
            }
            $json['data']=$tem_arr;
			echo json_encode($json);
			
			$_SESSION["Email"] = $email;
        }
    } 
	else
	{
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}



// Email Verification
function emailVerification ($email)
{
	$mysql_qry= "SELECT Email FROM customer WHERE Email='$email'";
	
    if ($result= mysqli_query($GLOBALS['cont'], $mysql_qry)) 
	{
        $num_of_rows = $result->num_rows;
		$tem_arr= array();
		
        if ($num_of_rows>0)
		{
            while ($row= mysqli_fetch_assoc($result))
			{
                $tem_arr[]= $row;
            }
            $json['data']=$tem_arr;
			echo json_encode($json);
		}
    } 
	else
	{
        $json['response'] = "Error: " . $mysql_qry . "<br>" . mysqli_error($GLOBALS['cont']);
        echo json_encode($json);
    }
}

?>

