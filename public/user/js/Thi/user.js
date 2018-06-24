$("document").ready(function() {
	$('#city').select2({
	  minimumInputLength: 2,
	  ajax: {
	    url: '/user/cities',
	    data: function (params) {
	      var query = {
	        search: params.term,
	        type: 'public'
	      }

	      // Query parameters will be ?search=[term]&type=public
	      return query;
	    },
	    processResults: function (data) {
	      // Tranforms the top-level key of the response object from 'items' to 'results'
	      return {
	        results: data
	      };
	    }
	  }
	});
});