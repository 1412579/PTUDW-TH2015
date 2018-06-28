$("document").ready(function() {
	var numberOfProductsPerPage = 5;
	LoadPagination(numberOfProductsPerPage);
	BindPaginationEvents(numberOfProductsPerPage);
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
	ActivatePageNumber(1);
};

function BindPaginationEvents(numberOfProductsPerPage) {
	$('.page-number').on('click', function () {
		var pageNumber = $(this).text();
		SendAjaxRequestToGetProducts(pageNumber, numberOfProductsPerPage);
	});
	$('#previous_page').on('click', function() {
		if (!$(this).parent().hasClass('disabled'))
		{
			var $currentPage = $('.page-item.active:eq(0)');
			var currentPageNumber = parseInt($currentPage.text());
			SendAjaxRequestToGetProducts(currentPageNumber - 1, numberOfProductsPerPage);			
		}

	});
	$('#next_page').on('click', function() {
		if (!$(this).parent().hasClass('disabled'))
		{
			var $currentPage = $('.page-item.active:eq(0)');
			var currentPageNumber = parseInt($currentPage.text());
			SendAjaxRequestToGetProducts(currentPageNumber + 1, numberOfProductsPerPage);			
		}
	});
};

function SendAjaxRequestToGetProducts(pageNumber, numberOfProductsPerPage) {
	var isFromSearching = $('#all_products').data('from-searching');
	var url = '/products';
	var data;
	if (!isFromSearching)
	{
		var subCategoryId = $('.category.selected').data('id') != undefined ? $('.category.selected').data('id') : '';
		var brandId = $('.brand.selected').data('id') != undefined ? $('.brand.selected').data('id') : '';
		url += `?subCategoryId=${subCategoryId}&brandId=${brandId}&page=${pageNumber}&perPage=${numberOfProductsPerPage}`;
		data = {
			isAjax: 1
		};
	}
	else
	{
		data = {
			productBrand: $('#productBrand').val(),
			productName: $('#productName').val(),
			description: $('#description').val(),
			priceRange: $('#ex2').val(),
			page: pageNumber,
			perPage: numberOfProductsPerPage,
			isAjax: 1,
			productCategoryId: ""
		};
	}
	$.ajax({
        url: url,
        type: isFromSearching ? 'POST' : 'GET',
        cache: false,
        data: data,
        success: function (result) {
        	console.log(products);
        	ActivatePageNumber(pageNumber);
        	if (result != undefined && result.count > 0)
        	{
        		var $content = $('#all_products');
        		$content.empty();
        		$content.append('<div class="product_grid_border"></div>');
        		var products = result.values;
        		for (var i = 0; i<products.length; i++)
        		{
        			var product = products[i];
        			var html = SetUpProduct(product);
        			$content.append(html);
        		}
        		$('.product_grid').isotope('destroy');
        		$('.product_grid').isotope({
					itemSelector: '.product_item',
		            getSortData: {
		            	price: function(itemElement)
		            	{
		            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
		            		return parseFloat(priceEle);
		            	},
		            	name: '.product_name div a'
		            },
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });
		        $('.shop_sorting_button').each(function()
		        {
		        	$(this).on('click', function()
		        	{
		        		$('.sorting_text').text($(this).text());
		        		var option = $(this).attr('data-isotope-option');
		        		option = JSON.parse(option);
						$('.product_grid').isotope(option);
		        	});
		        });
        	}
        	else
        	{
        		alert('There is something wrong. Please try again!!');
        	}
        }
    });
};

function ActivatePageNumber(pageNumber)
{
	$('#previous_page').parent().removeClass('disabled');
	$('#next_page').parent().removeClass('disabled');

	if (pageNumber == 1)
        $('#previous_page').parent().addClass('disabled');
    if (pageNumber == $('.page-number').last().text())
        $('#next_page').parent().addClass('disabled');
    if ($("#shop_pagination").data('total') > 1)
    {
    	$('.page-item.active:eq(0)').removeClass('active');
    	$(`.page-number:eq(${pageNumber - 1})`).parent().addClass('active');

    }
}

function SetUpProduct(product)
{

	var html = `<div class="product_item is_new">
					<div class="product_border"></div>
						<div class="product_image d-flex flex-column align-items-center justify-content-center"><img src="${product.photo}" alt=""></div>
							<div class="product_content">
								<div class="product_price">${product.price} đ</div>
								<div class="product_name"><div><a href="/product/${product.id}" tabindex="0">${product.name}</a></div></div>
							</div>
						<div class="product_fav"><i class="fas fa-heart"></i></div>
						<button class="btn" style="margin-top: 20px; background: #0e8ce4; color: #FFFFFF;">Thêm vào giỏ</button>
				</div>`;
	return html;							
}