var express = require('express');
var router = express.Router();
var mw = require('../config/middleware');
var LoginController = require('../controllers/LoginController');
var Dashboard = require('../model/dashboard.js');

router.get('/', function(req, res) {
    res.render('checkout/payment',{
        // layout: 'main-admin',
        title: 'Sửa sản phẩm'
        // product: result,
        // catelist: selectCate,
        // brandlist: selectBrand,
        // images: images,
        // numLeft: 3 - images.length
    }); 
});

module.exports = router;