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
   success: function( data ) {
   	if(data.error) {
  			$('#response').html(data.error);
   	} else {
   		$('#response').html(data.response);
   	}
   }
		});
				
	};

	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	$('section').fadeIn(900, focusAlias);

	$('#btnGetResponse').on('click', getResponse);
	
});