// app/routes.js


module.exports = function (app, passport, pool) {
	//Home
	
	
	app.use(function (req, res, next) {
		res.locals = ({
			user: req.user
		});
		return next();
	});

};

// route middleware to make sure

