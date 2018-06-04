var passport = require('passport');
const pool = require('../model/pg');

var homeController =  
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
					return res.json({status: 1,msg: "Đăng nhập thành công!"});
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
	}
}

module.exports = homeController;