$("document").ready(function() {
	var numberOfProductsPerPage = 5;
	LoadPagination(numberOfProductsPerPage);
	BindPaginationEvents();
});

function LoadPagination(numberOfProductsPerPage) {
	var $pagination = $("#shop_pagination");
	var total = $pagination.data("total");
	var numberOfPages = (total % numberOfProductsPerPage) != 0 ? Math.floor(total/numberOfProductsPerPage) + 1 : Math.floor(total/numberOfProductsPerPage);
	var $pages = $pagination.find("ul:eq(0)");
	$pages.append('<li class="page-item"><a class="page-link" href="#" tabindex="-1" id="previous_page">Previous</a></li>');
	if (numberOfPages > 0)
		$pages.append(`<li class='page-item active' data-index=${0}><a class='page-link page-number' href='#'>${1}</a></li>`);
	for (var i=1; i < numberOfPages; i++)
	{
		$pages.append(`<li class='page-item' data-index=${i+1}><a class='page-link page-number' href='#'>${i+1}</a></li>`);
	}
	var noResult = numberOfPages === 0 ? "disabled" : "";
	$pages.append(`<li class='page-item ${noResult}'><a class='page-link' href='#' tabindex='-1' id="next_page">Next</a></li>`);
	DisablePrevNextPagination(1);
};

function BindPaginationEvents() {
	$('.page-number').on('click', function () {
		var pageNumber = $(this).text();
		$(`.page-number:eq(${pageNumber - 2})`).parent().removeClass('active');
		$(this).parent().addClass('active');
		SendAjaxRequestToGetProducts(pageNumber);
	});
	$('#previous_page').on('click', function() {
		if (!$(this).parent().hasClass('disabled'))
		{
			var $currentPage = $('.page-item.active:eq(0)');
			var currentPageNumber = $currentPage.text();
			SendAjaxRequestToGetProducts(currentPageNumber - 1);			
		}

	});
	$('#next_page').on('click', function() {
		if (!$(this).parent().hasClass('disabled'))
		{
			var $currentPage = $('.page-item.active:eq(0)');
			var currentPageNumber = $currentPage.text();
			SendAjaxRequestToGetProducts(currentPageNumber + 1);			
		}
	});
};

function SendAjaxRequestToGetProducts(pageNumber) {
	var isFromSearching = $('#all_products').data('from-searching');
	var url = '/products';
	if (!isFromSearching)
	{
		var subCategoryId = $('.category.selected').data('id');
		var brandId = $('.brand.selected').data('id');
		url += `?subCategoryId=${subCategoryId}&brandId=${brandId}`;
		var data = {};
	}
	$.ajax({
        url: url,
        type: isFromSearching ? 'POST' : 'GET',
        cache: false,
        data: data,
        success: function (data) {
        	DisablePrevNextPagination(pageNumber);
        }
    });
};

function DisablePrevNextPagination(pageNumber)
{
	if (pageNumber == 1)
        $('#previous_page').parent().addClass('disabled');
    if (pageNumber == $('.page-number').last().text())
        $('#next_page').parent().addClass('disabled');
    if ($("#shop_pagination").data('total') != 1)
    	$(`.page-number:eq(${pageNumber})`).parent().addClass('active');
}