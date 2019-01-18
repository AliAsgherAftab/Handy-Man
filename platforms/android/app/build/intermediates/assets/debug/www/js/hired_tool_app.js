
// local variable
var numberValidity = /^\d*$/;



// Collecting tool to be hired
function hireTool (event) 
{
	var target = event.target;
	var value = target.getAttribute('alt');
	var toolPrice = 0;

	if (value === "Vise Gripplier")
	{toolPrice = 2;}
	else if (value === "Saw")
	{toolPrice = 2;}
	else if (value === "Socket Wrench")
	{toolPrice = 3;}
	else if (value === "Utility-Knife")
	{toolPrice = 1;}
	else if (value === "Level Tool")
	{toolPrice = 5;}
	else if (value === "Needle Noseplier")
	{toolPrice = 3;}
	else if (value === "Hammer")
	{toolPrice = 4;}
	else if (value === "Tape Measure")
	{toolPrice = 2;}
	else if (value ==="Electric Drill")
	{toolPrice = 8;}
	else if (value === "Screw Diver")
	{toolPrice = 3;}

	
	$.ajax({
		url:'https://buildingourownapi.000webhostapp.com/api/hired_tools_api.php',
		dataType: 'json',
		type:'POST',
		data: {'ToolValue':value, 'ToolPrice':toolPrice},
		success: function ()
		{
			window.location.href="Hiringtools.html";
		}
	 })

}



$(document).ready(function()
{

	// Hire tool due process
	$("#hire_tool_now").click(function(e) 
	{
		e.preventDefault();
		var startdate = $("#startdate").val();
		var enddate = $("#enddate").val();
		var option = $('input[name="option"]:checked').val();
		var postcode = $('#Postcode').val();

		postcode = postcode.trim();
		postcode = postcode.toUpperCase();

		if(!startdate == "" && !enddate == "" && !option == "" && !postcode == "")
		{	
			$.ajax({
				url:'https://buildingourownapi.000webhostapp.com/api/hired_tools_api.php',
				dataType: 'json',
				type:'POST',
				data: {'startdate':startdate, 'enddate':enddate, 'option':option, 'postcode':postcode},
				success: function ()
				{
					window.location.href="Payments.html";
				}
			})
		}
		else
		{
			alert("Please complete all sections");
		}
    });

	



	// Payment: Final transactional stage of hiring tool
	$("#pay").click(function(e) 
	{
		e.preventDefault();
		var cardname = $("#cname").val();
		var cardnumber = $("#ccnum").val();
		var expmonth = $('#expmonth').val();
		var cvv = $('#cvv').val();

		cardname = cardname.trim();
		cardname = cardname.toUpperCase();

		if(!cardname == "" && !cardnumber == "" && !expmonth == "" && !cvv == "")
		{	
			if (numberValidity.test(cardnumber) && numberValidity.test(cvv))
			{
				$.ajax({
					url:'https://buildingourownapi.000webhostapp.com/api/hired_tools_api.php',
					dataType: 'json',
					type:'POST',
					data: {'status':'completed'},
					success: function (data)
					{
						console.log(data.response);
						alert("Transaction Made Successfully")
						window.location.href="Tools.html";
					}
				})
			}
			else 
			{
				alert("Please insert a valid Card Number or CVV");
			}
		}
		else
		{
			alert("Please complete all sections");
		}
    });




	
	
	
	
});