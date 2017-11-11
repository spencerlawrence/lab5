$(document).ready(function(){

$("#deleteComments").click(function(){
	var url = "comment";
	$.ajax({
		url:url,
		type: "DELETE",
		success: function(data,textStatus) {
			console.log(textStatus);
			$("#comments").html('');
			$("#json").html('');
			$("#done").html('');
		}
	})
});
  
$("#getComments").click(function() {
	$.getJSON('comment', function(data) {
		console.log(data);
		var everything = "<ul>";
		for(var comment in data) {
			com = data[comment];
			everything += "<li>" + com.Name + " says: \"" + com.Comment + "\"</li>";
		}
		everything += "</ul>";
		$("#comments").html(everything);
		$("#json").html('');
		$("#done").html('');
	})
});
  
$("#postComment").click(function(){
	var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
	jobj = JSON.stringify(myobj);
	$("#json").text(jobj);
	var url = "comment";
	$.ajax({
		url:url,
		type: "POST",
		data: jobj,
		contentType: "application/json; charset=utf-8",
		success: function(data,textStatus) {
			$("#done").html(textStatus);
			$("#name").val('');
			$("#comment").val('');
		}
	})
});

});
