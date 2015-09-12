$(document).ready(function() {

	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	var focusAlias = function() {	
		$('.alias').focus(); 
	};

	$('section').fadeIn(900, focusAlias);
	
});