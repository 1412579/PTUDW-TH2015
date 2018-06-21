var express = require('express');
var mw = require('../config/middleware');
var productsRepo = require('../model/product.js')
var cartRepo = require('../model/cart.js');


let cartController = {
    index: function(req, res){
    let arr_products = [];
    let resProductToCartCookie = JSON.parse(req.cookies.productToCart);
    for (let i = 0; i < resProductToCartCookie.length; i++) {
        let p = productsRepo.getProductById(resProductToCartCookie[i].ProId);
        arr_products.push(p);
    }

    let items = [];
    Promise.all(arr_products).then(result => {
        for(let i = result.length -1; i >= 0; i--){
            let item = {
                Product: result[i],
                Quantity: resProductToCartCookie[i].Quantity,
                Total: result[i].price * resProductToCartCookie[i].Quantity
            }
        }
        var vm = {
            items: items
        };
        res.render('cart', vm);
    });
   
       
    },

    addCart: function(req, res){
        var item = {
            ProId: req.body.proId,
            Quantity: req.body.quantity
        };
        
       
        let productsAddToCart =[];
        if(req.cookies.productToCart === undefined){
            productsAddToCart.push(item);
        }
        else{
            productsAddToCart = JSON.parse(req.cookies.productToCart);
            for(let i = 0; i < productsAddToCart.length; i++){
                (productsAddToCart[i].proId === item.ProId) ? productsAddToCart[i].Quantity++ : productsAddToCart.push(item);
            }
            productsAddToCart.push(item);
        }
        res.cookie('productToCart', JSON.stringify(productsAddToCart), {maxAge: 1000 * 60 * 3 });
        res.json({'demo': 1})
        
        console.log(req.cookies);
    },
}

module.exports = cartController;