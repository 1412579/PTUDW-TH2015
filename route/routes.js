// app/routes.js
module.exports = function (app, passport, pool) {
	//Home
	var homeController = require('../controllers/HomeController');
	var userController = require('../controllers/UserController');
	var productController = require('../controllers/productController');
	var loginController = require('../controllers/LoginController');

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
	

	//login
	app.post('/login', loginController.login);
};

// route middleware to make sure

