var passport = require('passport');
const pool = require('../model/pg');

var logInController =  
{
	login: function(req, res,next)
	{
		passport.authenticate('local-login', function(err, user, info) {
            console.log(info);
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.json({status: 0,msg: "Sai thông tin đăng nhập, vui lòng thử lại!"}); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
					return res.json({status: 1,msg: "Đăng nhập thành công!",username: user.email });
				});
			})(req, res, next),
			function(req, res) {
	            //console.log("hello");
							//remember me
	            if (req.body.remember) {
	              req.session.cookie.maxAge = 1000 * 60 * 3;
	            } else {
	              req.session.cookie.expires = false;
							}
							return res.json({username: user.email});
        }
	},
	formLoginUser : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render('/login', { 
			layout: false,
			message: req.flash('loginMessage')[0] 
		});
	},
	formLoginAdmin : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render('admin/login', { 
			layout: false,
			message: req.flash('loginMessage')[0] 
		});
	}
	,
	adminlogin : function(req, res, next) {
		passport.authenticate('local-login-admin', function(err, user, info) {
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.redirect('/admin'); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
					return res.redirect('/admin/dashboard');
				});
			})(req, res, next),
			function(req, res) {
	            //console.log("hello");
	            //remember me
	            if (req.body.remember) {
	              req.session.cookie.maxAge = 1000 * 60 * 3;
	            } else {
	              req.session.cookie.expires = false;
	            }
        }
	},
	
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	},
	logoutAdmin: function(req, res) {
		req.logout();
		res.redirect('/admin');
	},
}

module.exports = logInController;

