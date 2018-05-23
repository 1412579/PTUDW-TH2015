var homeController = 
{
	index: function(req, res)
	{
		var model = {
			title: 'Trang chủ'
		};
		res.render('home', model);
	}
}

module.exports = homeController;