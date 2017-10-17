$(function(){

	$(".lyricContent").on("hidden.bs.modal", function(){
		$(".songLyricsHere").empty();
	})

	function renderSongs(songs) {

		$(".card-columns").empty();

		songs.forEach(function(song){


			// generate HTML and dipslay new cards on the screen

			var newDiv = $('<div class="card"></div>');
			var cardImg = $('<img class="card-img-top" src="img/song-pic.jpg">');
			var newCardBody = $('<div class="card-body"></div>');
			var newSongTitle = $('<h4 class="card-title"></h4>');
			var newArtist = $('<p class="card-text"></p>');
			var newButton = $('<button type="button" class="btn btn-info btn-sm get-lyrics" data-toggle="modal" data-target=".lyricContent"> View Lyrics</button>');


			newSongTitle.text(song.track.track_name);
			newArtist.text(song.track.artist_name);
			newButton.val(song.track.track_id);
			console.log(newButton.val());

			newCardBody.append(newSongTitle, newArtist, newButton);
			newDiv.append(cardImg,newCardBody);

			$(".card-columns").append(newDiv);

		});
	}

	$(".card-columns").on("click", ".get-lyrics", function(e){
		e.preventDefault();

		var buttonValue = $(this).val();

		$.ajax({
		    type: "GET",
		    data: {
		        apikey:"bea1ecda96ff636cf5c843126a47a727",
		        track_id: buttonValue,
		        f_has_lyrics: 1,
		        format:"jsonp",
		        callback:"jsonp_callback"
		    },
		    url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
		    dataType: "jsonp",
		    jsonpCallback: 'jsonp_callback',
		    contentType: 'application/json',
		    success: function(data) {
		        console.log(data);
		        		var results = data.message.body.lyrics.lyrics_body;
		        		console.log(results);
		        		$(".songLyricsHere").html(results);

		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }
		 });
		})

	
	// listener for search function

	$("#search-form").submit(function(e){
		e.preventDefault();

		var songSearch = $(".search-bar").val();

		$.ajax({
		    type: "GET",
		    data: {
		        apikey:"bea1ecda96ff636cf5c843126a47a727",
		        q_track: songSearch,
		        f_has_lyrics: 1,
		        format:"jsonp",
		        callback:"jsonp_callback"
		    },
		    url: "http://api.musixmatch.com/ws/1.1/track.search",
		    dataType: "jsonp",
		    jsonpCallback: 'jsonp_callback',
		    contentType: 'application/json',
		    success: function(data) {
		        console.log(data); 
		        
		        var results = data.message.body.track_list;
		        renderSongs(results);
		        	
		       
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }  

		 });

	})

	var granimInstance = new Granim({
    element: '#canvas-image',
    direction: 'top-bottom',
    opacity: [1, .5, 0],
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#485563', '#29323c', '#29323c'],
                ['#00c6ff', '#0072ff', '#0072ff']
            ],
            transitionSpeed: 6000
        }
    }
	})
})