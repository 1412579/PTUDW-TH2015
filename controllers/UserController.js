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
		res.render('user-order');
	},
	orderDetail: function(req, res){
		res.render('user-order-detail');
	}
};

module.exports = userController;