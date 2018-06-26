var Brand = require('../model/brand.js');
var cities = require('all-the-cities').filter(city => {
												  return city.country.match('VN')
												});
var userBusiness = require('../model/user.js');


var userController = 
{
	detail: function(req, res){
		console.log(res.locals.pageInfo);
		var model = {
			user: req.user,
			pageInfo: res.locals.pageInfo
		};
		res.locals.pageInfo = undefined;
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
	update: function(req, res, next) {
		console.log(req.body);
		userBusiness.update(req.body)
			.then(function(updateCode) {
				var message;
				switch (updateCode)
				{
					case 0:
						message = 'Hệ thống gặp lỗi, vui lòng thử lại sau!';
						break;
					case 1: 
						message = 'Cập nhật thông tin thành công';
						break;
				}

				var model = {
					updateSuccess: updateCode == 1 ? true : false,
					message: message
				};
				res.locals.pageInfo = model;
				res.redirect('/user/detail');
			});
	},
	changePassword: function(req, res, next) {
		userBusiness.changePassword(req.body.userId, req.body.oldPassword, req.body.newPassword, req.body.retypeNewPassword)
			.then(function(updateCode) {
				var message;
				switch (updateCode)
				{
					case -1:
						message = 'Mật khẩu mới không khớp, vui lòng nhập lại!';
						break;	
					case 0:
						message = 'Nhập sai mật khẩu cũ, vui lòng nhập lại!';
						break;
					case 1: 
						message = 'Cập nhật mật khẩu thành công';
						break;
					default:
						message = 'Hệ thống gặp lỗi, vui lòng thử lại sau!';
						break;
				}
				var model = {
					updateSuccess: updateCode == 1 ? true : false,
					message: message
				};
				res.locals.pageInfo = model;
				return next();
			});
		 
	}
};

module.exports = userController;