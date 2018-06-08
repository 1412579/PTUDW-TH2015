var UserBrandController = {
    index: function(req, res)
	{
		var model = {
			title: 'Thương hiệu'
		};
		res.render('brand', model);
	}

}

module.exports = UserBrandController;