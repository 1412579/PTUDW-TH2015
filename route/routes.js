// app/routes.js
module.exports = function (app, passport, pool) {
	//Home
	var homeController = require('../controllers/HomeController');
	var userController = require('../controllers/UserController');
	var productController = require('../controllers/productController');
	var loginController = require('../controllers/LoginController');
	var adminController = require('../controllers/AdminController');
	var categoryController = require('../controllers/CategoryController');
	var brandController = require('../controllers/BrandController');
	var mw = require('../config/middleware');

	app.use(function (req, res, next) {
		res.locals = ({
			user: req.user
		});
		return next();
	});

	app.get('/', homeController.index);
	app.get('/user/detail', userController.detail);
	app.get('/user/orders', userController.orders);
	app.get('/user/order/:orderId', userController.orderDetail)
	app.get('/product/:productId', productController.detail);
	
	app.use("/admin", adminController);
	app.use("/admin/category", categoryController);
	app.use("/admin/brand", brandController);
	//app.use("/admin/category", mw.isLoggedInAdmin, mw.isSysAdminAccess,mw.isAdminAccess, categoryController);
	
	app.get('/logout', loginController.logout);
	//app.use("/admin/category", mw.isLoggedInAdmin, mw.isSysAdminAccess,mw.isAdminAccess, CategoryController);
	//login
	app.post('/login', loginController.login);
};

// route middleware to make sure

