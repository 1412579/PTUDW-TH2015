$("document").ready(function() {
	LoadPagination();
	BindPaginationEvents();
	SendAjaxRequestToGetProducts();
});

function LoadPagination() {
	var $pagination = $("#shop_pagination");
	var total = $pagination.data("total");
	var numberOfPages = (total % 20) != 0 ? Math.floor(total/20) + 1 : Math.floor(total/20);
	var $pages = $pagination.find("ul:eq(0)");
	$pages.append('<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" id="previous_page">Previous</a></li>');
	for (var i=0; i < numberOfPages; i++)
	{
		$pages.append(`<li class='page-item' data-index=${i+1}><a class='page-link' href='#'>${i+1}</a></li>`);
	}
	var noResult = numberOfPages === 0 ? "disabled" : "";
	$pages.append(`<li class='page-item ${noResult}'><a class='page-link' href='#' tabindex='-1' id="next_page">Next</a></li>`);
};

function BindPaginationEvents() {
	$(".page-link").on('click', function () {
		SendAjaxRequestToGetProducts();
	});
	$("#previous_page").on('click', function() {
		SendAjaxRequestToGetProducts();
	});
	$("#next_page").on('click', function() {
		SendAjaxRequestToGetProducts();
	});
};

function SendAjaxRequestToGetProducts() {
	var isFromSearching = $('#all_products').data('from-searching');
	var url = '/products';
	if (!isFromSearching)
	{
		var subCategoryId = $('.category.selected').data('id');
		var brandId = $('.brand.selected').data('id');
		url += `subCategoryId=${subCategoryId}&brandId=${brandId}`;
		var data = ;
	}
	$.ajax({
        url: url,
        type: isFromSearching ? 'POST' : 'GET',
        cache: false,
        data: data,
        success: function (data) {
            console.log(data);
            if (data.status == 0) {
                alert(data.msg);
            }
            else if(data.status == 1){
                location.reload(false);
            }
        }
    });
}