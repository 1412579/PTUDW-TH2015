var category = require('../model/category.js');
var product = require('../model/product.js');

var homeController =  
{
	index: function(req, res)
	{
		let categories = [];
		let promises = [];
		promises.push(category.getDetailedCategory());
		promises.push(product.getNewestProducts(10)); 
		promises.push(product.getBestSellerProducts(10));
		promises.push(product.getMostViewdProducts(10));
		Promise.all(promises)
			.then(function(result) {
				console.log(result);
				var model = {
						title: 'Trang chủ',
						categories: result[0],
						newestProducts: result[1],
						bestSellerProducts: result[2],
						mostViewedProducts: result[3]
					};
					res.render('home', model);
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