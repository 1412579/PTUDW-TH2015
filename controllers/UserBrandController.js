var products = require('../model/product.js');
var express = require('express');
var router = express.Router();

var UserBrandController = {
    index: function(req, res)
	{
		products.getAll()
		.then((result)=>{
			res.render('brand',{
				list: result,
				title: 'Danh sách thương hiệu'
			});
			// resolve(result);			
		})
		.catch((err) => {
			console.log(err);
			// res.end();
		});
	}

}

module.exports = UserBrandController;