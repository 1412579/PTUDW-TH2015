var productBusiness = require('../model/product.js');
var categoryBusiness = require('../model/category.js');
var brandBusiness = require('../model/brand.js');
const itemsPerPage = 5;

var productController = 
{
	index: function(req, res)
	{
		var promises =  [];
		var subCategoryId, brandId;
		
		//subCategoryId = req.query.subCategoryId;
		brandId = req.query.brandId;
		if (req.query.subCategoryId == undefined)
		{
			if (brandId == undefined)
				req.query.subCategoryId = 3;
		}
		console.log(req.query);
		if (req.query.isAjax != undefined && req.query.isAjax == 1)
		{
			productBusiness.getProducts(req.query)
				.then(function(result) {
					res.send(result);
				})
				.catch(function(error) {
					console.log(error);
					res.end();
				});
		}
		else
		{
			req.query.perPage = itemsPerPage;
			promises.push(categoryBusiness.getDetailedCategory());
			promises.push(brandBusiness.getAllBrandByCategory(req.query.subCategoryId));
			promises.push(productBusiness.getProducts(req.query));
			Promise.all(promises)
				.then(function(result) {
					var categories = result[0];
					var brands = result[1];
					var products = result[2].values;
					console.log(result[2].count);
					var model = {
						categories: categories,
						brands: brands,
						selectedCateId: req.query.subCategoryId,
						selectedBrandId: brandId,
						products: products,
						isFromSearching: false,
						numberOfProducts: result[2].count
					};
					res.render('shop', model);
				})
				.catch(function(error) {
					console.log(error);
					res.end();
				});
		}

		
		
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
		if (req.body.isAjax != undefined && req.body.isAjax == 1)
		{
			productBusiness.getProducts(req.body)
				.then(function(result) {
					res.send(result);
				})
				.catch(function(error) {
					console.log(error);
					res.end();
				});
		}
		else
		{
			req.body.perPage = itemsPerPage;
			promises.push(categoryBusiness.getDetailedCategory());
			promises.push(brandBusiness.getAll());
			promises.push(productBusiness.getProducts(req.body));
			Promise.all(promises)
				.then(function(result) {
					var categories = result[0];
					var products = result[2].values;
					var brands = result[1];
					console.log(result[2].count);
					var model = {
						categories: categories,
						brands: brands,
						selectedCateId: subCategoryId,
						selectedBrandId: req.params.brandId,
						products: products,
						isFromSearching: true,
						filters: req.body,
						numberOfProducts: result[2].count
					};
					res.render('shop', model);
				})
				.catch(function(error) {
					console.log(error);
					res.end();
				});
		}
	}
	// search: function(req, res) {
	// 	console.log(req.body);
	// 	var promises = [];
	// 	promises.push(productBusiness.getProducts(req.body));
	// 	Promise.all(promises)
	// 		.then(function(result) {
	// 			var products = result[0];
	// 			var model = {
	// 				products: products,
	// 				isFromSearching: true,
	// 				numberOfProducts: products.length
	// 			};
	// 			res.send(model);
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 			res.end();
	// 		});
	// }
};

module.exports = productController;