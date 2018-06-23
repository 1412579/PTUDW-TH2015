var express = require('express');
var router = express.Router();
var Order = require('../model/order.js');

router.get('/list', (req, res) =>{
	Order.getAll()
    .then(result => {
		//console.log(result);
        res.render('admin/list-order',{
            layout: 'main-admin',
            orders: result
        }); 
    })
    .catch(err => console.log(err));
});

router.get('/edit/:id', (req, res) => {
    let orderdetail;
    Order.getById(req.params.id)
    .then(result => {
        orderdetail = result;
        return Order.getProducts(req.params.id);
    })
    .then(result => {
        res.render('admin/edit-order',{
            layout: 'main-admin',
            orderdetail: orderdetail,
            products: result,
            message: req.flash('messageCate')[0]
        }); 
    })
    .catch(err=>console.log(err));
});

router.post('/edit/:id', (req, res) => {
    let data = {
        id: req.params.id,
        status: req.body.status
    }
    Order.updateStatusById(data)
    .then(() => {
        req.flash('messageCate', 'Đã cập nhật đơn hàng thành công!');
        res.redirect(req.get('referer'));
    })
    .catch(err=>console.log(err));
});

module.exports = router;