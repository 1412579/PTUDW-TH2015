var Brand = require('../model/brand.js');
var cities = require('all-the-cities').filter(city => {
												  return city.country.match('VN')
												});
var userBusiness = require('../model/user.js');


var userController = 
{
	detail: function(req, res){
		
		var model = {
			user: req.user
		};
		res.render('user-detail', model);
	},
	orders: function(req, res){
		var products = [
			{
				id: 1,
				createdDate: '22/06/2018',
				total: 150000,
				beingDelivered: true
			},
			{
				id: 2,
				createdDate: '22/06/2018',
				total: 150000,
				beingDelivered: true
			},
			{
				id: 3,
				createdDate: '22/06/2018',
				total: 100000,
				isDelivered: true
			},
			{
				id: 4,
				createdDate: '22/06/2018',
				total: 120000,
				isCancelled: true
			},
			{
				id: 5,
				createdDate: '22/06/2018',
				total: 220000,
				beingPrepared: true
			}
		]
		res.render('user-order', {products: products});
	},
	orderDetail: function(req, res){
		res.render('user-order-detail');
	},
	cities: function(req, res) {
		var result = cities.filter(city => {
											return city.name.toLowerCase().indexOf(req.query.search.toLowerCase()) != -1
							   })
							.map(city =>  {
								return {
								id: city.name,
								text: city.name
								};
							})
		res.send(result);
	},
	update: function(req, res) {
		console.log(req.body);
		userBusiness.update(req.body)
			.then(function(result) {
			// req.logIn(result, function(err) {
			// 	if (err) { console.log(err); };
			// 	// Redirect if it succeeds
			// 		return res.json({status: 1,msg: "Đăng nhập thành công!",username: user.email });
			// 	});
				res.redirect('/user/detail');
			})
			.catch(function(ex) {
				console.log(ex);
			})
	}
};

module.exports = userController;