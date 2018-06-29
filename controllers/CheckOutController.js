var express = require('express');
var router = express.Router();
var mw = require('../config/middleware');
var LoginController = require('../controllers/LoginController');
var productsRepo = require('../model/product.js');
var cartRepo = require('../model/cart.js');
var moment = require('moment');
var orderDetail = require('../model/order-detail.js');
var orderRepo = require('../model/order.js');
var service = require('../model/support.service.js');


router.get('/',  function(req, res) {
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
        }
        arr_products.push(service.getProvince());
        productsAddToCartCookie = JSON.parse(req.cookies.cart);

        for (let i = 0; i < productsAddToCartCookie.length; i++) {
            arr_products.push(productsRepo.getProductById(parseInt(productsAddToCartCookie[i].ProId)));
        }
        var Provinces = [];
            // service.getProvince()
            //         .then((result)=> {
            //             for(let i = 0; i < result.length; i++){
            //                 Provinces.push(result[i]);
            //             }
            //             // console.log("thanh cong")
            //         })
            //         .catch(err => console.log(err));
        let items = [];
        Promise.all(arr_products).then(result => {
            Provinces = result[0];
            for(let i = result.length -1; i > 0; i--){
                let pro = result[i][0];
                console.log(pro)
                
                let item = {
                    Product: pro,
                    Quantity: productsAddToCartCookie[i-1].Quantity,
                    Amount: (parseInt(pro.price) * parseInt(productsAddToCartCookie[i-1].Quantity))
                }
                items.push(item)
            }
            let TotalAmount = 0;
            for(let i = 0; i < items.length; i++){
                TotalAmount+= parseInt(items[i].Amount);
            }
           // Provinces.sort((referenceStr, compareString) => referenceStr.localeCompare(compareString));
            var vm = {
                items: items,
                TotalAmount: TotalAmount,
                Quantity_Products: items.length,
                Provinces: Provinces,
                QuantityProductInCart: QuantityProductInCart
            };
            res.render('checkout/payment', vm);
        }).catch(function(error){console.log(error);});
});

router.post('/payment', (req, res)=>{

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
            
            
            let proInfo = {
                id: pro.product_id,
                sold_quantity: parseInt(pro.sold_quantity)+parseInt(req.body.dataCart[i].Quantity),
                inventory: parseInt(pro.quantity)-parseInt(pro.sold_quantity)-parseInt(req.body.dataCart[i].Quantity)
            }

            productsRepo.updateById(proInfo)
            .then(console.log("Cap nhat thanh cong"))
            .catch(err => console.log(err))

            Total+= parseInt(cartInfo.Amount);
            
            orderDetail.newOrderDetail(cartInfo)
            .then(()=>{
                req.flash('messageCate', 'Đã thêm chi tiết đơn hàng thành công!');
                console.log("Đã thêm chi tiết đơn hàng thành công");
            }).catch(err => console.log(err));
        }
        let getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');        
        let orderInfo = {
            User_id: 10,
            Total: Total,
            adress: req.body.dataUser.address,
            created_at: getTimeNow,
            updated_at: getTimeNow,
            email: req.body.dataUser.email,
            phone: req.body.dataUser.phone,
            order_status_id: 2
        }
        Promise.all(orderRepo.newOrder(orderInfo)).then(()=>{
            console.log("Đã thêm đơn hàng thành công");
        }).catch(err => console.log(err));
        return res.json({status: 1,msg: "Thanh toán thành công"});
    }).catch(function(error){console.log(error);});
});

module.exports = router;