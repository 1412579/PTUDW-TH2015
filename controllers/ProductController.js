var productController = 
{
	index: function(req, res)
	{
		res.render('shop');
	},
	detail: function(req, res)
	{
		var product = {
			origin: 'Trung Quốc',
			brand: 'Chanel',
			name: 'Túi xách thời thượng',
			views: 300,
			type: 'Túi xách',
			price: '2.000.000',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum.'
		};

		var photos = [
			{
				url: '/user/images/single_4.jpg'
			},
			{
				url: '/user/images/single_2.jpg'
			},
			{
				url: '/user/images/single_3.jpg'
			}
		];

		var sameTypeProducts = [
			{
				photo: '/user/images/new_1.jpg',
				price: 300000,
				name: 'Balo YM201'
			},
			{
				photo: '/user/images/new_2.jpg',
				price: 379000,
				name: 'Balo TT.Sonic'
			},
			{
				photo: '/user/images/new_3.jpg',
				price: 225000,
				name: 'Balo BTS 2018'
			},
			{
				photo: '/user/images/new_4.jpg',
				price: 379000,
				name: 'Balo white'
			},
			{
				photo: '/user/images/new_5.jpg',
				price: 300000,
				name: 'Balo BT6900A'
			}
		];

		var sameBrandProducts = [
			{
				photo: '/user/images/new_1.jpg',
				price: 300000,
				name: 'Balo YM201'
			},
			{
				photo: '/user/images/new_2.jpg',
				price: 379000,
				name: 'Balo TT.Sonic'
			},
			{
				photo: '/user/images/new_3.jpg',
				price: 225000,
				name: 'Balo BTS 2018'
			},
			{
				photo: '/user/images/new_4.jpg',
				price: 379000,
				name: 'Balo white'
			},
			{
				photo: '/user/images/new_5.jpg',
				price: 300000,
				name: 'Balo BT6900A'
			}
		];
		var model = {
			product: product,
			photos: photos,
			sameTypeProducts: sameTypeProducts,
			sameBrandProducts: sameBrandProducts
		};
		res.render('product', model);
	}
};

module.exports = productController;