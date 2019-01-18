
// local variable
var numberValidity = /^\d*$/;



// Collecting tool to be hired
function selectService (event) 
{
	var target = event.target;
	var value = target.getAttribute('alt');

	console.log("whatus");

	$.ajax({
		url:'https://buildingourownapi.000webhostapp.com/api/services_api.php',
		dataType: 'json',
		type:'POST',
		data: {'ServiceType':value},
		success: function ()
		{
			window.location.href="BookService.html";
		}
	 })
}



$(document).ready(function()
{

	// Hire tool due process
	$("#service_request_submit").click(function(e) 
	{
		e.preventDefault();
		var postcode = $("#Postcode").val();
		var phonenumber = $("#Phonenumber").val();
		var whenToCallOption = $("#whenToCallOption :selected").text();
		var whenToCallOptionValue = $("#whenToCallOption").val(); 
		var imageFile = $('#imageFIle').val();
		var comment = $('#comment').val();

		postcode = postcode.trim();
		phonenumber = phonenumber.trim();
		comment = comment.trim();
		
		postcode = postcode.toUpperCase();

		if(!postcode == "" && !phonenumber == "" && whenToCallOptionValue != "0")
		{	
			if (numberValidity.test(phonenumber))
			{
				$.ajax({
					url:'https://buildingourownapi.000webhostapp.com/api/services_api.php',
					dataType: 'json',
					type:'POST',
					data: {'postcode':postcode, 'phonenumber':phonenumber, 'whenToCallOption':whenToCallOption, 'imageFile':imageFile, 'comment':comment},
					success: function (data)
					{
						console.log(data.response);
						alert("Request Made Successfully");
						window.location.href="Services.html";
					}
				})
			}
			else
			{
				alert("Please insert a valid phone number");
			}
		}
		else
		{
			alert("Please complete the required details");
		}


    });
	
	
	
	
});