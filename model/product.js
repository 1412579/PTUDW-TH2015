const pool = require('../model/pg');


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
			var query = `select p.id, p.name as product_name, price, p.created_at, image, b.name as brand
						from products p
						left join brand b
						on p.brand_id = b.id
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
			var query = `select p.id, p.name as product_name, price, p.created_at, image, b.name as brand, sold_quantity
						from products p
						left join brand b
						on p.brand_id = b.id
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
	}
}

module.exports = product;
