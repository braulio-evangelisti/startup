$(document).ready(function() {
	
	var alias = '';
	
	var focusAlias = function() {	
		$('.alias').focus(); 
	};
	
	var getResponse = function() {
		alias = $('.alias').val();

		$.ajax({
   url: "http://bootcamp.aws.af.cm/welcome/" + alias,
   type: 'GET',
   dataType: "json",
   success: function( data, status, xhr ) {
    console.log(status);
   	if(data.error) {
  			$('#response').addClass('error').html(data.error);
   	} else {
   		$('#response').removeClass('error').html(data.response);
   	}
   },
   error: function( error, status, xhr ) {
    $('#response').addClass('error').html(status);
   }
		});
				
	};

	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	$('section').fadeIn(900, focusAlias);

	$('#btnGetResponse').on('click', getResponse);
	
});