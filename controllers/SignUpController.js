var passport = require('passport');
const pool = require('../model/pg');

var SignUpController =  
{
	sign_up: function(req, res,next)
	{
        console.log('truoc khi vo ham');
		passport.authenticate('local-signup', function(err, user, info) {
            console.log('vo dc');
            console.log(info);
			if (err) { return next(err); }
			// Redirect if it fails
			if (!user) { return res.json({status: 0,msg: "Sai thông tin đăng nhập, vui lòng thử lại!"}); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// Redirect if it succeeds
					return res.json({status: 1,msg: "Đăng nhập thành công!"});
				});
            })
            // (req, res, next),
		// 	function(req, res) {
	    //         //console.log("hello");
	    //         if (req.body.remember) {
	    //           req.session.cookie.maxAge = 1000 * 60 * 3;
	    //         } else {
	    //           req.session.cookie.expires = false;
	    //         }
        // }
	},
}

module.exports = SignUpController;

