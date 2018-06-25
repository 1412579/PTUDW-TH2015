var express = require('express');
var router = express.Router();
var mw = require('../config/middleware');
var LoginController = require('../controllers/LoginController');
var productsRepo = require('../model/product.js');
var cartRepo = require('../model/cart.js');
var moment = require('moment');
var orderDetail = require('../model/order-detail.js');
var orderRepo = require('../model/order.js');


router.get('/',  function(req, res) {
    let productsAddToCartCookie =[];
        let arr_products = [];
        if(req.cookies.cart === undefined){
            req.cookies.cart ={}
        }
        productsAddToCartCookie = JSON.parse(req.cookies.cart);

        for (let i = 0; i < productsAddToCartCookie.length; i++) {
            arr_products.push(productsRepo.getProductById(parseInt(productsAddToCartCookie[i].ProId)));
        }
        let items = [];
        Promise.all(arr_products).then(result => {
            for(let i = result.length -1; i >= 0; i--){
                let pro = result[i][0];
                let item = {
                    Product: pro,
                    Quantity: productsAddToCartCookie[i].Quantity,
                    Amount: (parseInt(pro.price) * parseInt(productsAddToCartCookie[i].Quantity)).toString()
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
                Quantity_Products: items.length
            };
            res.render('checkout/payment', vm);
        }).catch(function(error){console.log(error);});
});

router.post('/payment', (req, res)=>{
    // console.log(req.body.dataUser);
    
    // for(let i = 0; i < req.body.dataCart.length; i++){
    //     console.log(req.body.dataCart[i]);
    // }


    let arr_products = [];
    for (let i = 0; i < req.body.dataCart.length; i++) {
        arr_products.push(productsRepo.getProductById(parseInt(req.body.dataCart[i].ProId)));
    }
    Promise.all(arr_products).then(result => {
        let Total = 0;
        for(let i = result.length -1; i >= 0; i--){
            let pro = result[i][0];
            let getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
            let cartInfo = {
                ProId: parseInt(pro.product_id),
                name: pro.name,
                Quantity: parseInt(req.body.dataCart[i].Quantity),
                created_at: getTimeNow,
                updated_at: getTimeNow,
                order_id: 13,
                Amount: (parseInt(pro.price) * parseInt(req.body.dataCart[i].Quantity))
            };
            Total+= parseInt(cartInfo.Amount);
            orderDetail.newOrderDetail(cartInfo)
            .then(()=>{
                // req.flash('messageCate', 'Đã thêm chi tiết đơn hàng thành công!');
                console.log("them duoc laf ngon");
            }).catch(err => console.log(err));
        }
        // let orderInfo = {
        //     User_id: 3,
        //     Total: Total,
        //     adress: req.body.dataUser.adress,
        //     email: req.body.dataUser.email,
        //     phone: req.body.dataUser.phone,
        //     order_status_id: 2
        // }
        // orderRepo.newOrder(orderInfo).then(()=>{
        //     console.log("them duoc laf ngon");
        // }).catch(err => console.log(err));

    }).catch(function(error){console.log(error);});
});

module.exports = router;