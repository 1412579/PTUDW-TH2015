var category = require('../model/category.js');
var product = require('../model/product.js');
var brand = require('../model/brand.js');

var homeController =  
{
	index: function(req, res)
	{
		console.log(req.user);
		let categories = [];
		let promises = [];
		promises.push(category.getDetailedCategory());
		promises.push(product.getNewestProducts(10)); 
		promises.push(product.getBestSellerProducts(10));
		promises.push(product.getMostViewdProducts(10));
		Promise.all(promises)
			.then(function(result) {
				brand.getAll()
						.then(brands => {
							var model = {
								title: 'Trang chủ',
								categories: result[0],
								newestProducts: result[1],
								bestSellerProducts: result[2],
								mostViewedProducts: result[3],
								brands: brands,
								user: req.user
							};
							res.render('home', model);
						});
				
			})
			.catch(function(error) {
				console.log(error);
				res.end();
			});
		// category.getDetailedCategory()
		// 	.then((result) => {
		// 		var model = {
		// 				title: 'Trang chủ',
		// 				categories: result
		// 			};
		// 			res.render('home', model);
		// 	});
	}
}

module.exports = homeController;