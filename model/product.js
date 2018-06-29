const pool = require('../model/pg');
const itemsPerPage = 5;

var product = {
  	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from products order by id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else{
                    resolve(result.rows);
                }
            });
        })
		
    },
	getNewestProducts: function(numberOfProducts) {
		return new Promise((resolve,reject)=>{
			var query = `select p.id, p.name as product_name, price, p.created_at, image, b.name as brand, c.name as sub_category, c.id sub_category_id
						from products p
						left join brand b
						on p.brand_id = b.id
						left join category c
						on p.cate_id = c.id
						order by created_at desc limit ${numberOfProducts}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getBestSellerProducts: function(numberOfProducts) {
		return new Promise((resolve,reject)=>{
			var query = `select p.id, p.name as product_name, price, p.created_at, image, b.name as brand, sold_quantity, c.name as sub_category, c.id sub_category_id
						from products p
						left join brand b
						on p.brand_id = b.id
						left join category c
						on p.cate_id = c.id
						order by sold_quantity desc limit ${numberOfProducts}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getMostViewdProducts: function(numberOfProducts) {
		return new Promise((resolve,reject)=>{
			var query = `select p.id, p.name as product_name, price, p.created_at, image, b.name as brand, view
						from products p
						left join brand b
						on p.brand_id = b.id
						where view is not null
						order by view desc limit ${numberOfProducts}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getProductById: function(id) {
		return new Promise((resolve,reject)=>{
			var query = `select p.id product_id, 
								p.price,
								p.quantity, 
								p.view, 
								p.sold_quantity, 
								p.description, 
								b.origin, 
								b.id brand_id, 
								sc.id sub_category_id, 
								sc.name as type,
								c.id category_id,
								c.name category,
								p.image main_picture,
								b.name brand,
								p.name
						from products p
						left join brand b on p.brand_id = b.id
						left join category sc on p.cate_id = sc.id
						left join category c on sc.parent_id = c.id
						where p.id = ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getProductImagesById: function(id) {
		return new Promise((resolve,reject)=>{
			var query = `select i.image url 
						from products p
						inner join product_images i on p.id = i.product_id
						where p.id = ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getProductsByBrand: function(brandId, numberOfProducts) {
		return new Promise((resolve,reject)=>{
			var query = `select p.name,
							   p.id,
							   p.price,
							   p.image photo
						from products p
						where p.brand_id = ${brandId}`;
			if (numberOfProducts != undefined)
				query += ` limit ${numberOfProducts}`
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getProductsByProductType: function(productTypeId, numberOfProducts) {
		return new Promise((resolve,reject)=>{
			var query = `select p.name,
							   p.id,
							   p.price,
							   p.image photo
						from products p
						where p.cate_id = ${productTypeId}`;
			if (numberOfProducts != undefined)
				query += ` limit ${numberOfProducts}`
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	getProducts: function(parameters) {
		return new Promise((resolve,reject)=>{
			//console.log(parameters.subCategoryId);
			let subCate, brandId, productBrand, productName, price, description, category;
			if (parameters.subCategoryId != undefined && parameters.subCategoryId != '')
				subCate = ` inner join category c on p.cate_id = c.id and c.id = ${parameters.subCategoryId}`;
			else
				subCate = '';

			if (parameters.brandId != undefined && parameters.brandId != '')
				brandId =  ` inner join brand b on p.brand_id = b.id and b.id = ${parameters.brandId}`;
			else
				brandId = '';

			if (parameters.productBrand != undefined && parameters.productBrand != '')
				productBrand =  ` inner join brand b on p.brand_id = b.id and b.name ilike '%${parameters.productBrand}%'`;
			else
				productBrand = '';

			if (parameters.productName != undefined && parameters.productName != '')
				productName = ` and p.name ilike '%${parameters.productName}%'`;
			else
				productName = '';

			if (parameters.description != undefined && parameters.description != '')
				description = ` and p.description ilike '%${parameters.description}%'`;
			else
				description = '';

			if (parameters.categoryId != undefined && parameters.categoryId != '')
				category = ` inner join category s on p.cate_id = s.id
							inner join category c on s.parent_id = c.id and c.id = ${parameters.categoryId}`;
			else
				category = '';


			if (parameters.priceRange != undefined)
			{
				var prices = parameters.priceRange.split(',');
				price = ` and p.price >= ${prices[0]} and p.price <= ${prices[1]}`;
			}
			else
				price = '';

			var offset = '';
			if (parameters.isAjax != undefined && parameters.isAjax == 1)
				offset = ` offset ${(parameters.page - 1) * parameters.perPage}`;

			var condition = `from products p
						 ${subCate}
						 ${brandId}
						 ${productBrand}
						 ${category}
						 where 1 = 1
						 ${productName}
						 ${description}
						 ${price}`;



			var query = `
						(select cast(count(*) as text) as name, 
								0 price, 
								0 id, 
								'0' photo
						${condition})
						union
						(select p.name,
								p.price,
								p.id,
								p.image photo
						 ${condition}
						 order by p.id
						 limit ${parameters.perPage}
						 ${offset})
						 order by id`;
			

			console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                {
                	var products = { count: result.rows[0].name, values: result.rows.slice(1)};
                    resolve(products);
                }
            });
        })
	},
	getTotalNumberOfProducts: function() {
		return new Promise((resolve,reject)=>{
			var query = `select count(*)
						 from products`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
	},
	updateById: function(proInfo){
		console.log(proInfo);
        return new Promise((resolve,reject)=>{
            var query = `update products set sold_quantity = ${proInfo.sold_quantity},inventory = ${ proInfo.inventory } where id = ${ proInfo.id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
}

module.exports = product;
