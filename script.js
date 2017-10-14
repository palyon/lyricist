$(function(){
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
		        	results.forEach(function(track_list){
		        		var artist = track_list.track.artist_name;
		        		var song = track_list.track.track_name;
		        		var trackId = track_list.track.track_id;
		        		console.log(artist, song, trackId);
		        	})


		       
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }  

		 });

	})
})

