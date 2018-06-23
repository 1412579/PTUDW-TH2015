// app/routes.js
module.exports = function (app, passport, pool) {
	//Home
	var homeController = require('../controllers/HomeController');
	var userController = require('../controllers/UserController');
	var productController = require('../controllers/productController');
	var loginController = require('../controllers/LoginController');
	var signUpController = require('../controllers/SignUpController');
	var adminController = require('../controllers/AdminController');
	var categoryController = require('../controllers/CategoryController');
	var brandController = require('../controllers/BrandController');
	var userBrandController = require('../controllers/UserBrandController');
	var userCartController = require('../controllers/UserCartController');
	var adminProductController = require('../controllers/AdminProductController');
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
	app.get('/brand', userBrandController.index);
	app.get('/show-all', productController.index);
	
	app.use("/admin", adminController);
	app.use("/admin/category", categoryController);
	app.use("/admin/brand", brandController);
	
	app.get("/cart", userCartController.index);
	// app.post("/addCart", userCartController.addCart);
	
	
	//app.use("/admin/category", mw.isLoggedInAdmin, mw.isSysAdminAccess,mw.isAdminAccess, categoryController);
	
	app.use("/admin/product", adminProductController);

	app.get('/logout', loginController.logout);
	//app.use("/admin/category", mw.isLoggedInAdmin, mw.isSysAdminAccess,mw.isAdminAccess, CategoryController);
	//login
	app.post('/login', loginController.login);
	app.post('/sign-up', signUpController.sign_up);
	
};

// route middleware to make sure

