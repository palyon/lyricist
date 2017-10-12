$(function(){
	$("form").submit(function(e){
		e.preventDefault();

		var nameSearch = $(".title-search").val();
		console.log(nameSearch);


		 // var url = "http://api.musixmatch.com/ws/1.1/track.search&apikey=bea1ecda96ff636cf5c843126a47a727&q_track=" + nameSearch;

		 // $.get(url, function(title){

		})

	})
// })