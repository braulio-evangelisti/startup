$(document).ready(function () {
	var focusAlias = function () {	
		$('.alias').focus(); 
	};
	var getResponse = function () {
		var alias = '';
		alias = $('.alias').val();

		$.ajax({
			url: 'http://bootcamp.aws.af.cm/welcome/' + alias,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				if (data.error) {
					console.log(data.error);
				} else {
					console.log(data.response);
				}
			},
   error: function (error, status, xhr) {
    console.log(status);
   }
		});

	};

	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	$('section').fadeIn(900, focusAlias);

	$('#btnGetResponse').on('click', getResponse);

});