const pool = require('../model/pg');
var productsRepo = require('../model/product.js')

let cart = {
    update: () => {

    },
    saveCartToBD: (cartInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into order_details(product_id,product_name,quantity,buying_price) values(${ cartInfo.ProId },${ cartInfo.name }, ${cartInfo.Quantity}, ${cartInfo.Amount})`;
            console.log(query);
            pool.query(query, function(err, res){
                if (err){
                    reject(err);
                }
                else{
                    console.log(res);
                    resolve(res);
                }
                    
            });
        });
    },

    remove: function(cart, id){
        for (var i = cart.length - 1; i >= 0; i--) {
            if (proId === cart[i].ProId) {
                cart.splice(i, 1);
                return cart;
            }
        }
    },

    getCartCountProduct: (res, req) =>{
        let productsAddToCartCookie =[];
        let arr_products = [];
        if(req.cookies.cart){
            req.cookies.cart ={}
            res.end();
        }
        productsAddToCartCookie = JSON.parse(req.cookies.cart);
        return productsAddToCartCookie.length
    }
}

module.exports = cart;