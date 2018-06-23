const pool = require('../model/pg');
var productsRepo = require('../model/product.js')

let cart = {
    getCookie: (cname)=> {
        var name = cname + "=";
        var ca = window.document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    },
    update: () => {

    },
    add: (cart, item) => {
    },

    remove: function(req, res, next){
        for (var i = cart.length - 1; i >= 0; i--) {
            if (proId === cart[i].ProId) {
                cart.splice(i, 1);
                return;
            }
        }
    },

    getListProductInCart: () =>{
        let productsAddToCartCookie =[];
        let arr_products = [];
        productsAddToCartCookie = JSON.parse(this.getCookie("cart"));
        for (let i = 0; i < productsAddToCartCookie.length; i++) {
            let p = productsRepo.getProductById(productsRepo[i].ProId);
            arr_products.push(p);
        }
        return arr_products;
    }
}

module.exports = cart;