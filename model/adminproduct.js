const pool = require('../model/pg');
var AdminProduct = {
	new: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into products(name,alias,price,description,user_id,cate_id,created_at,updated_at,hide,brand_id,sold_quantity,quantity,discount,image) values('${ cateInfo.name }','${ cateInfo.alias }', ${cateInfo.price },'${ cateInfo.description}',${ cateInfo.user_id },${ cateInfo.cate_id },'${ cateInfo.created_at }','${ cateInfo.updated_at }',${ cateInfo.hide },${ cateInfo.brand_id },${ cateInfo.counting_sell },${ cateInfo.inventory },${ cateInfo.discount },'${cateInfo.image}') RETURNING id`;
            console.log(query);
            pool.query(query, function(err, res){
                if (err){
                    reject(err);
                }
                else{
                    console.log(res);
                    resolve(res);
                }
                    
            });
        });
	},
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select products.id,products.discount,products.quantity,products.name,products.price,fullname,category.name as catename,products.created_at,products.updated_at,products.hide,products.image,brand.name as brandname from products,category,users,brand where products.user_id = users.id and cate_id = category.id and products.brand_id = brand.id`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    getAllIndex: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    getAllChild: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category where parent_id = ${id} order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
	},
	getById: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from products where id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
	},
	updateById: function(cateInfo){
        return new Promise((resolve,reject)=>{
            var query = `update products set name = '${cateInfo.name}',description = '${ cateInfo.description }', alias = '${ cateInfo.alias }', updated_at = '${ cateInfo.updated_at }', hide = ${ cateInfo.hide },cate_id = ${ cateInfo.cate_id },brand_id = ${ cateInfo.brand_id },quantity = ${ cateInfo.inventory },discount = ${ cateInfo.discount },image = '${ cateInfo.image }' where id = ${ cateInfo.id}`;
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
    updateChildById: function(id){
        return new Promise((resolve,reject)=>{
            var query = `update category set parent_id = 0 where parent_id = ${id}`;
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
	product_Images_New: function(cateInfo,callback){
		return new Promise((resolve,reject)=>{
            console.log(cateInfo);
            var query = `insert into product_images(image,product_id) values('${cateInfo.image}',${cateInfo.product_id}) RETURNING id`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
    getProductImages: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from product_images where product_id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
	delete: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from products where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
    }, 
    deleteImage: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from product_images where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
	}, 
    deleteThumb: function(id){
        return new Promise((resolve,reject)=>{
            var query = `update products set image='' where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
	}
}

module.exports = AdminProduct;