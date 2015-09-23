$(document).ready(function () {
	var albums = [];
	
	var focusAlias = function () {	
		$('.alias').focus(); 
	};

	var highlightName = function (name) {
		var nameHigh = '';
		nameHigh = $('.response').html().replace(name, '<strong class="bold">' + name + '</strong>');
		$('.response').html(nameHigh);
	};
	
	var getResponse = function () {
		var alias = '';
		alias = $('.alias').val();

		$.ajax({
   url: 'http://bootcamp.aws.af.cm/welcome/' + alias,
   type: 'GET',
   dataType: "json",
   success: function (data, status, xhr) {
    console.log(status);
   	if (data.error) {
  			$('.response').addClass('error').html(data.error);
   	} else {
   		$('.response').removeClass('error').html(data.response);
   		highlightName(alias);
   	}
   },
   error: function (error, status, xhr) {
    $('.response').addClass('error').html(status);
   }
		});
				
	};

	var buildStructure = function (data) {
		var list = $('#albums');
		var albumArticle = '<article class="album"></article>';
		var albumBody = '<div class="album-body"></div>';
		var albumHeader = '';
		var date = '';
		var link = '';
		var image = '';
		var albumType = '';

		list.empty();

		$(data.albums.items).each(function () {
			albumHeader = '<header><h4 class="title">'+ this.name +'</h4></header>';
			image = '<div class="cover"><a href="'+ this.images[0].url +'" target="_blank" ><img src="'+ this.images[2].url +'" alt="'+ this.name +'" /></a></div>';
			albumType = '<div>Type: '+ this.type +'</div>';
			date = '<div>Release date: '+ this.release_date +'</div>';
			link = '<div><a href="'+ this.external_urls.spotify +'" target="_blank" >Open in spotify</a></div>';

			$(list)
			.append($(albumArticle).fadeIn('slow')
				.append(albumHeader)
				.append($(albumBody)
					.append(image)
					.append(albumType)
					.append(date)
					.append(link)
					)
				);

		});

	};

	var getAlbums = function () {
		var artist = '';

		artist = $('#txtSearch').val();
	
		if (!artist){
			alert('Please insert artist name...');
		} else {

			$.ajax({
	   url: 'https://api.spotify.com/v1/search',
	   type: 'GET',
	   dataType: 'json',
	   data: { 
	   	q: artist, 
	   	type : 'album'
	   },
	   success: function (data, status, xhr) {
	    console.log(data);
	    buildStructure(data);
	   },
	   error: function (error, status, xhr) {
	    //todo: Manage the error message
	   }
			});
		
		}

	};

	$('.column').fadeIn(900, focusAlias);

	$('#btnGetResponse').on('click', getResponse);

	$('#btnSearch').on('click', getAlbums);
});