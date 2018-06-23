//app/controller/AdminController.js

var express = require('express');
var router = express.Router();
var mw = require('../config/middleware');
var LoginController = require('../controllers/LoginController');
var Dashboard = require('../model/dashboard.js');

router.get('/dashboard', mw.isLoggedInAdmin, mw.isAdminAccess,  function(req, res) {
    let cates;
    let brands;
    Dashboard.newestCates()
    .then(result => {
        cates = result;
        return Dashboard.newestBrands();
    })
    .then(result => {
        brands = result;
        return Dashboard.newestProducts();
    })
    .then(result => {
        res.render('admin/index',{
            layout: 'main-admin',
            cates: cates,
            brands: brands,
            products: result
        });
    })
    .catch(err => console.log(err));
});

router.get('/',mw.LoggedAdmin, mw.isAdminAccess, LoginController.formLoginAdmin);

router.post('/',mw.LoggedAdmin, mw.isAdminAccess,LoginController.adminlogin);

module.exports = router;
