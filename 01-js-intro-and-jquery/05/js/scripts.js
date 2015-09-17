$(document).ready(function () {
	/*
		This next line is a fallback for jQuery library. If can't load fron CDN, this copy does it.
		I guess this is not the better place for it. Where would you recommend to do this?
	*/
	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	$('section').fadeIn('slow');
});