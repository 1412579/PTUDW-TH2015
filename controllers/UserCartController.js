var express = require('express');
var mw = require('../config/middleware');
var products = require('../model/product.js')
var cartRepo = require('../model/cart.js');


let cartController = {
    index: function(req, res){
        res.render('cart');
    },

    addCart: function(req, res){
        var item = {
            ProId: req.body.proId,
            Quantity: req.body.quantity
        };
       // cartRepo.add(req.session, item);
    },
}

module.exports = cartController;