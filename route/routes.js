// app/routes.js
module.exports = function (app, passport, pool) {
	//Home
	var homeController = require('../controllers/HomeController');
	var userController = require('../controllers/UserController');
	
	app.use(function (req, res, next) {
		res.locals = ({
			user: req.user
		});
		return next();
	});

	app.get('/home', homeController.index);
	app.get('/user/detail', userController.detail);
	app.get('/user/orders', userController.orders);
	app.get('/user/order/detail', userController.orderDetail)
};

// route middleware to make sure

