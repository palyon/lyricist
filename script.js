$(function(){
	$("form").submit(function(e){
		e.preventDefault();

		var songSearch = $(".title-search").val();

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
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }    
		 });

	})
})

