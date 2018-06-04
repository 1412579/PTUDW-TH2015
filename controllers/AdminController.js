//app/controller/AdminController.js

var express = require('express');
var router = express.Router();
var mw = require('../config/middleware');
var LoginController = require('../controllers/LoginController');

router.get('/dashboard', mw.isLoggedInAdmin, mw.isAdminAccess,  function(req, res) {
    res.render('admin/index',{
        layout: 'main-admin',
    });
});

router.get('/',mw.LoggedAdmin, mw.isAdminAccess, LoginController.formLoginAdmin);

router.post('/',mw.LoggedAdmin, mw.isAdminAccess,LoginController.adminlogin);

module.exports = router;
