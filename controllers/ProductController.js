var productBusiness = require('../model/product.js');
var categoryBusiness = require('../model/category.js');
var brandBusiness = require('../model/brand.js');

var productController = 
{
	index: function(req, res)
	{
		var promises =  [];
		var subCategoryId;
		if (req.params.subCategoryId == undefined)
			req.params.subCategoryId = 3;
		subCategoryId = req.params.subCategoryId;
		promises.push(categoryBusiness.getDetailedCategory());
		promises.push(brandBusiness.getAllBrandByCategory(subCategoryId));
		promises.push(productBusiness.getProducts(req.params));
		Promise.all(promises)
			.then(function(result) {
				var categories = result[0];
				var brands = result[1];
				var products = result[2];
				var model = {
					categories: categories,
					brands: brands,
					selectedCateId: subCategoryId,
					selectedBrandId: req.params.brandId,
					products: products
				};
				res.render('shop', model);
			})
			.catch(function(error) {
				console.log(error);
				res.end();
			});
		
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
						res.end();
					});
			})
			.catch(function(error) {
				console.log(error);
				res.end();
			});
	},
	search: function(req, res) {
		console.log(req.body);
		var promises = [];
		var subCategoryId;
		if (req.params.subCategoryId != undefined)
			subCategoryId = req.params.subCategoryId;
		else
			subCategoryId = 3;
		promises.push(categoryBusiness.getDetailedCategory());
		promises.push(brandBusiness.getAllBrandByCategory(subCategoryId));
		promises.push(productBusiness.getProducts(req.body));
		Promise.all(promises)
			.then(function(result) {
				var categories = result[0];
				var products = result[2];
				var brands = result[1];
				var model = {
					categories: categories,
					brands: brands,
					selectedCateId: subCategoryId,
					selectedBrandId: req.params.brandId,
					products: products
				};
				res.render('shop', model);
			})
			.catch(function(error) {
				console.log(error);
				res.end();
			});
	}
};

module.exports = productController;