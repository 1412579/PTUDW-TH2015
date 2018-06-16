const pool = require('../model/pg');

let cart = {
    add: (cart, item) => {
        console.log(item);
        // console.log(cart);
        // for (i = cart.length - 1; i >= 0; i--) {
        //     if (cart[i].ProId === item.ProId) {
        //         cart[i].Quantity += item.Quantity;
        //         return;
        //     }
        // }

      //  cart.push(item);
    }
}

module.exports = cart;