$('document').ready(function() {
	$('.datepicker').datepicker({
	    format: 'mm/dd/yyyy'
	});

	$('#registerBtn').on('click', function() {
		$('.nav-tabs a[href="#register"]').tab('show')
	});

		$('#loginBtn').on('click', function() {
		$('.nav-tabs a[href="#log-in"]').tab('show')
	});
})
