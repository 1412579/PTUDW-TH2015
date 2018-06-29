var express = require('express');
var mw = require('../config/middleware');
var cartRepo = require('../model/cart.js');
var productsRepo = require('../model/product.js')


let cartController = {
    index: function(req, res){
        var QuantityProductInCart;
		if(req.cookies.QuantityProductInCart === undefined)
		{
			QuantityProductInCart = 0;
		}
		else{
			QuantityProductInCart = parseInt(req.cookies.QuantityProductInCart);
        }
        
        let productsAddToCartCookie =[];
        let arr_products = [];
        if(req.cookies.cart === undefined){
            req.cookies.cart ={}
            console.log("vào đây");
            var vm = {
                NoProducts: true,
                QuantityProductInCart: QuantityProductInCart
            };
            res.render('cart', vm);
        }
        else{
            productsAddToCartCookie = JSON.parse(req.cookies.cart);

            for (let i = 0; i < productsAddToCartCookie.length; i++) {
                arr_products.push(productsRepo.getProductById(parseInt(productsAddToCartCookie[i].ProId)));
            }
            let items = [];
            Promise.all(arr_products).then(result => {
                for(let i = result.length -1; i >= 0; i--){
                    let pro = result[i][0];
                    pro.price = parseInt(pro.price);
                    let item = {
                        Product: pro,
                        Quantity: productsAddToCartCookie[i].Quantity,
                        Amount: (parseInt(pro.price) * parseInt(productsAddToCartCookie[i].Quantity))
                    }
                    items.push(item)
                }
                let TotalAmount = 0;
                for(let i = 0; i < items.length; i++){
                    TotalAmount+= parseInt(items[i].Amount);
                }
                var vm = {
                    items: items,
                    TotalAmount: TotalAmount,
                    QuantityProductInCart: QuantityProductInCart
                };
                res.render('cart', vm);
            }).catch(function(error){console.log(error);});
        }
        
    },

    updateQuantityCartInHeader: function(req, res){
        cartRepo.getCartCountProduct()
        .then((result)=>{
			// res.render('',{
            //     layout: 'user'
			// 	list: result,
			// 	title: 'Danh sách thương hiệu'
			// });
			// resolve(result);			
		})
        .catch((err) => {
			console.log(err);
			// res.end();
		});
    },

    delete: (req,res) =>{
        
    },
}

module.exports = cartController;