$(document).ready(function() {


	// Capitalizing
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}



	// Displaying email and username
	$.ajax({
		url:'https://buildingourownapi.000webhostapp.com/api/get_username_and_email_api.php',
		dataType: 'json',
		success: function (data)
		{
			var response = data.data;
			document.getElementById("profile_username").innerHTML = response.username.capitalize();
			document.getElementById("profile_email").innerHTML = response.email;
		}
	})



	// Displaying service history
	$.ajax({
		url:'https://buildingourownapi.000webhostapp.com/api/get_service_history_api.php',
		dataType: 'json',
		success: function (data)
		{
			if(data.data != 0)
			{
				$.each(data.data,function (key,index)
				{
					var serviceResult = document.createElement("P");
					var result = document.createTextNode(`Type of Service: ${index.ServiceType}`);
					serviceResult.appendChild(result);
					document.getElementById("requestHistory").appendChild(serviceResult);
				});
			}
		},
		error: function ()
		{
			var defaultMessage = document.createElement("P");
			var message = document.createTextNode("You have no service booked.");
			defaultMessage.appendChild(message);
			document.getElementById("requestHistory").appendChild(defaultMessage);
		}
	})



		// Displaying hired tool history
		$.ajax({
			url:'https://buildingourownapi.000webhostapp.com/api/get_hired_tool_history_api.php',
			dataType: 'json',
			success: function (data)
			{
				if(data.data != 0)
				{
					$.each(data.data,function (key,index)
					{
						var toolResult = document.createElement("P");
						var result = document.createTextNode(`Tool Name: ${index.Tool} | Price: £${index.Price} | Start Date: ${index.StartDate} | End Date: ${index.EndDate} | Option: ${index.ToolOption} | Post Code: ${index.PostCode}`);
						toolResult.appendChild(result);
						document.getElementById("toolHistory").appendChild(toolResult);
					});
				}
			},
			error: function ()
			{
				var defaultMessage = document.createElement("P");
				var message = document.createTextNode("You have no tools hired.");
				defaultMessage.appendChild(message);
				document.getElementById("toolHistory").appendChild(defaultMessage);
			}
		})




	// Forget Password
	$("#changePassword_reset").click(function(e) 
	{
        e.preventDefault();
        var new_password = $("#new_password").val();
		var confirm_password = $("#confirm_password").val();
		
		if(!new_password == "" && !confirm_password == "")
		{
			if(new_password == confirm_password)
			{
				// Changing password
				$.ajax({
					url:'https://buildingourownapi.000webhostapp.com/api/profile_api.php',
					dataType: 'json',
					type:'POST',
					data: {'new_password':new_password},
					success: function (data){
						console.log(data.response);
						alert("Password Changed Successfully");
						window.location.href="My Profile.html";
					},
					error: function (xhr,status,error) {
						console.log(xhr.statusText + " " + status + " " + error);
					}
				})
			}
			else
			{
				alert("New password doesn't match");
			}
		}
		else{
			alert("Please complete the form");
		}
	});
	






	// Sign Out
	$("#signout").click(function(e) 
	{
		e.preventDefault();
		$.ajax({
			url:'https://buildingourownapi.000webhostapp.com/api/sign_out_api.php',
			dataType: 'json',
			type:'POST',
			data: {'signout':'out'},
			success: function (data)
			{
				console.log(data.response);
				alert("You have been signed out");
				window.location.href="index.html";
			},
		})
	});


	
	
	
	
});