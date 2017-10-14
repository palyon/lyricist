$(function(){

	function renderSongs(songs) {

		$(".card-columns").empty();

		songs.forEach(function(song){
			// console.log(song.track.track_name);

			var newDiv = $('<div class="card"></div>');
			var cardImg = $('<img class="card-img-top" src="img/song-pic.jpg">');
			var newCardBody = $('<div class="card-body"></div>');
			var newSongTitle = $('<h4 class="card-title"></h4>');
			var newArtist = $('<p class="card-text"></p>');
			var newButton = $('<button type="button" class="btn btn-info btn-sm get-lyrics"> View Lyrics</button>');

			newSongTitle.text(song.track.track_name);
			newArtist.text(song.track.artist_name);
			newButton.val(song.track.track_id);
			console.log(newButton.val())

			newCardBody.append(newSongTitle, newArtist, newButton);
			newDiv.append(cardImg,newCardBody);

			$(".card-columns").append(newDiv);

		 });

		$('.get-lyrics').on('click', function(e){
			e.preventDefault();

			var buttonValue = $(".get-lyrics").val();

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

			    },
			    error: function(jqXHR, textStatus, errorThrown) {
			        console.log(jqXHR);
			        console.log(textStatus);
			        console.log(errorThrown);
			    }
			 });
			})
	}


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
		        	// results.forEach(function(track_list){
		        	// 	var artist = track_list.track.artist_name;
		        	// 	var song = track_list.track.track_name;
		        	// 	var trackId = track_list.track.track_id;
		        	// 	// console.log(artist, song, trackId);
		        	// })



		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }

		 });

	})
})
