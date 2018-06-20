var express = require('express');
var mw = require('../config/middleware');
var productsRepo = require('../model/product.js')
var cartRepo = require('../model/cart.js');


let cartController = {
    index: function(req, res){
        var arr_p = [];
    for (var i = 0; i < req.cookies.cart.length; i++) {
        var cartItem = req.cookies.cart[i];
        var p = productsRepo.getProductById(cartItem.ProId);
        arr_p.push(p);
    }
    res.cookie('cart',arr_p);

    // var items = [];
    // Promise.all(arr_p).then(result => {
    //     for (var i = result.length - 1; i >= 0; i--) {
    //         var pro = result[i][0];
    //         var item = {
    //             Product: pro,
    //             Quantity: req.session.cart[i].Quantity,
    //             Amount: pro.Price * req.session.cart[i].Quantity
    //         };
    //         items.push(item);
    //     }
    // });

        var vm = {
            items: items
        };
        res.render('cart');
    },

    addCart: function(req, res){
        var item = {
            ProId: req.body.proId,
            Quantity: req.body.quantity
        };
       let productsAddToCart =[];
        productsAddToCart.push(item);
        // if(req.cookie.cart){
            res.cookie('cart', JSON.stringify(productsAddToCart));
        // }
        
        var ketqua = req.cookies.cart;
        console.log(ketqua);
        // var kq = JSON.parse(ketqua);
        // console.log(kq);
        // console.log(kq.ProId);
        // cartRepo.add(req.cookies.cart, item);
    },

    
}

module.exports = cartController;