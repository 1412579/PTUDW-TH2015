$(document).ready(function() {
    $('#user-order').DataTable({
    	"paging":   true,
        "ordering": true,
        "pagingType": "full_numbers",
        "order": [[ 1, "desc" ]]
    });
    $('#user-order').removeClass( 'display' ).addClass('table table-striped table-bordered');
} );