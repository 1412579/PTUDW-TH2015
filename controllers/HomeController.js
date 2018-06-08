var category = require('../model/category.js')

var homeController =  
{
	index: function(req, res)
	{
		let categories = [];
		category.getDetailedCategory()
			.then((result) => {
				var model = {
						title: 'Trang chủ',
						categories: result
					};
					res.render('home', model);
			});
	}
}

module.exports = homeController;