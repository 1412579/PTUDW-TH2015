const pool = require('../model/pg');

let cart = {
    add: (cart, item) => {
        console.log(item);
        // for (i = cart.length - 1; i >= 0; i--) {
        //     if (cart[i].ProId === item.ProId) {
        //         cart[i].Quantity += item.Quantity;
        //         return;
        //     }
        // }
        console.log("cart");
        console.log(cart);
    //    cart.push(item);
    },

    remove: function(req, res, next){
        for (var i = cart.length - 1; i >= 0; i--) {
            if (proId === cart[i].ProId) {
                cart.splice(i, 1);
                return;
            }
        }
    }
}

module.exports = cart;