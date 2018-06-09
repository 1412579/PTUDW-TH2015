var productBusiness = require('../model/product.js');
var categoryBusiness = require('../model/category.js');

var productController = 
{
	index: function(req, res)
	{
		res.render('shop');
	},
	detail: function(req, res)
	{
		var promises =  [];
		promises.push(categoryBusiness.getDetailedCategory());
		promises.push(productBusiness.getProductById(req.params.productId));
		promises.push(productBusiness.getProductImagesById(req.params.productId));
		Promise.all(promises)
			.then(function(result) {
				var categories = result[0];
				var product = result[1][0];
				var photos = result[2];
				var innerPromises = [];
				console.log(product);
				innerPromises.push(productBusiness.getProductsByBrand(product.brand_id, 5));
				innerPromises.push(productBusiness.getProductsByProductType(product.sub_category_id, 5));
				Promise.all(innerPromises)
					.then(function(innerResult) {
						console.log(product);
						var sameBrandProducts = innerResult[0];
						var sameTypeProducts = innerResult[1];
						var model = {
							categories: categories,
							product: product,
							photos: photos,
							sameTypeProducts: sameTypeProducts,
							sameBrandProducts: sameBrandProducts
						};
						res.render('product', model);
					})
					.catch(function(error) {
						console.log(error);
					});
			})
			.catch(function(error) {
				console.log(error);
			});
	}
};

module.exports = productController;