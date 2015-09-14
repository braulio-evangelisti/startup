$(document).ready(function() {
	
	var alias = '';
	var name  = '';
	var nameLength = '';
	var lastChange = '';

	var albums = [];
	
	var focusAlias = function() {	
		$('.alias').focus(); 
	};

	var highlightName = function() {
		name = $('#response').html();
		name = name.substring(8);
		nameLength = name.length-1;
		name = name.substring(0,nameLength);
		lastChange = $('#response').html().replace( name, "<strong class='bold'>" + name + "</strong>" );
		$('#response').html(lastChange);
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
   		highlightName();
   	}
   },
   error: function( error, status, xhr ) {
    $('#response').addClass('error').html(status);
   }
		});
				
	};

	var buildStructure = function( data ) {
		var list = $('#albums');
		var albumArticle = '<article class="album"></article>';
		var albumBody = '<div class="album-body"></div>';
		var albumHeader = '';
		var date = '';
		var link = '';
		var image = '';
		var album_type = '';

		list.empty();

		$( data.albums.items ).each( function() {

			albumHeader = '<header><h4 class="title">'+ this.name+'</h4></header>';
			image = '<div class="cover"><a href="'+ this.images[0].url+'" target="_blank" ><img src="'+ this.images[2].url+'" alt="'+ this.name+'" /></a></div>';
			album_type = '<div>Type: '+ this.type+'</div>';
			date = '<div>Release date: '+ this.release_date+'</div>';
			link = '<div><a href="'+ this.external_urls.spotify+'" target="_blank" >Open in spotify</a></div>';

			$(list)
			.append(
				$(albumArticle).fadeIn('slow')
				.append(
					albumHeader).append(
					$(albumBody).append(
						image).append(album_type).append(date).append(link)));

		});

	};

	var getAlbums = function() {
		var artist = '';

		artist = $('#txtSearch').val();
	
		if(!artist){
			alert('Please insert artist name...');
		} else {

			$.ajax({
	   url: "https://api.spotify.com/v1/search",
	   type: 'GET',
	   dataType: "json",
	   data: { 
	   	q: artist, 
	   	type : "album"
	   },
	   success: function( data, status, xhr ) {
	    console.log(data);
	    buildStructure(data);
	   },
	   error: function( error, status, xhr ) {
	    //todo: Manage the error message
	   }
			});
		
		}

	};

	window.jQuery || document.write('<script src="../js/jquery-2.1.4.min.js"><\/script>');

	$('section').fadeIn(900, focusAlias);

	$('#btnGetResponse').on('click', getResponse);

	$('#btnSearch').on('click', getAlbums);
	
});