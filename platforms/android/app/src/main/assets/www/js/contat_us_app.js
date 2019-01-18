
$(document).ready(function()
{

	// Contact Us
	$("#contact_us_submit").click(function(e) 
	{
		e.preventDefault();
		var message = $("#contact_message").val();

		message = message.trim();

		if(!message == "")
		{
			$.ajax({
				url:'https://buildingourownapi.000webhostapp.com/api/contact_us_api.php',
				dataType: 'json',
				type:'POST',
				data: {'contact_message':message},
				success: function (data)
				{
					console.log(data.response);
					alert("Message Sent Successfully")
					window.location.href="Contact.html";
				}
			})
		}
		else
		{
			alert("Please enter your message.");
		}
    });
	
	
	
});