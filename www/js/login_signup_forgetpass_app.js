$(document).ready(function() {
	
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	// Capitalizing
	String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
	}
	

	// Registeration 
    $("#reg_click").click(function(e) 
	{
        e.preventDefault();
        var username = $("#username").val();
        var email = $("#email").val();
		var password = $("#password").val();
		
		// Validations
		username = username.trim();
		email = email.trim();

		username = username.capitalize();
		email = email.toLowerCase();

		
		if(!username == "" && !email == "" && !password == "")
		{
			if (email.match(emailPattern))
			{

				// Checks if email already exists in the database
				$.ajax({
					url: 'https://buildingourownapi.000webhostapp.com/api/login_signup_forgetpass_api.php',
					data: {validEmail:'email', email:email},
					datatype:'json',
					type:'GET',
					success: function (data)
					{
						if(data.data != 0)
						{
							$.each(data.data,function (key,index)
							{
								if(index.Email != undefined)
								{
									alert("There is already a registered account with this email.");
								}
							});
						}
					},
					error: function () 
					{
						$.ajax({
							url:'https://buildingourownapi.000webhostapp.com/api/login_signup_forgetpass_api.php',
							dataType: 'json',
							type:'POST',
							data: {'username':username, 'email':email, 'password': password},
							success: function (data){
								console.log(data.response);
								alert("Registration Completed Successfully");
								window.location.href="index.html";
							},
							error: function (xhr,status,error) {
								console.log(xhr.statusText + " " + status + " " + error);
							}
						 })
					}
				})
			}
			else
			{
				alert("Input the correct email format (Example: xyz@hotmail.com)");
			}
		}
		else{
			alert("Please complete the form");
		}
    });
	
	
	

	// Forget Password
	$("#forgetPass_reset").click(function(e) 
	{
        e.preventDefault();
        var email = $("#email").val();
        var new_password = $("#new_password").val();
		var confirm_password = $("#confirm_password").val();

		email = email.trim();
		email = email.toLowerCase();
		
		if(!email == "" && !new_password == "" && !confirm_password == "")
		{
			if (email.match(emailPattern))
			{
				if(new_password == confirm_password)
				{
					// Checks if email already exists in the database
					$.ajax({
						url: 'https://buildingourownapi.000webhostapp.com/api/login_signup_forgetpass_api.php',
						data: {validEmail:'email', email:email},
						datatype:'json',
						type:'GET',
						success: function (data)
						{
							if(data.data != 0)
							{
								$.each(data.data,function (key,index)
								{
									if(index.Email != undefined)
									{
										// Changing password
										$.ajax({
											url:'https://buildingourownapi.000webhostapp.com/api/login_signup_forgetpass_api.php',
											dataType: 'json',
											type:'POST',
											data: {'forget_email':email, 'new_password':new_password},
											success: function (data){
												console.log(data.response);
												alert("Password Changed Successfully");
												window.location.href="index.html";
											},
											error: function (xhr,status,error) {
												console.log(xhr.statusText + " " + status + " " + error);
											}
										})
									}
								});
							}
						},
						error: function () 
						{
							alert("There is no registered account with this email.");
						}
					})
				}
				else
				{
					alert("New password doesn't match");
				}
			}
			else
			{
				alert("Input the correct email format (Example: xyz@hotmail.com)");
			}
		}
		else{
			alert("Please complete the form");
		}
    });
	
	
	

	// Login
	$("#login").click(function(e)
	{
        e.preventDefault();
		var email = $("#email").val();
        var password = $("#password").val();
		
		email = email.trim();
		email = email.toLowerCase();
		
		if(!email == "" && !password == "")
		{
			$.ajax({
				url: 'https://buildingourownapi.000webhostapp.com/api/login_signup_forgetpass_api.php',
				data: {show_user:'show', log_email:email, pass:password},
				datatype:'json',
				type:'GET',
				success: function(data)
				{
					if(data.data != 0)
					{
						$.each(data.data,function (key,index) 
						{
							console.log(index.Username)
							console.log(index.Email)
						})
						window.location.href="Services.html";
					}
				},
				error: function()
				{
					alert("Email or Password is Incorrect.");
				}
			})
		}
		else
		{
			alert("Please insert username and password");
		}
    })
	
	
	
});