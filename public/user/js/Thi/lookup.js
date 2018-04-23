$("document").ready(function() {
	$("#ex2").slider({});

	$("#ex2").on("change", function(){
		var values = $(this).val().split(",");

		$("#min-price").text(values[0]);
		$("#max-price").text(values[1]);
	});
});
