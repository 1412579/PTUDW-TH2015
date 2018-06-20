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

module.exports = router;