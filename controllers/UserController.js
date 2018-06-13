var Brand = require('../model/brand.js');


var userController = 
{
	detail: function(req, res){
		var model = {
			user: {
				name: 'Username'
			}
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
	}
};

module.exports = userController;