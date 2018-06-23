const pool = require('../model/pg');
var dashboard = {
    newestCates: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category order by id limit 4`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    newestBrands: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from brand order by id limit 4`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    newestProducts: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select products.id,products.discount,products.quantity,products.name,products.price,fullname,category.name as catename,products.created_at,products.updated_at,products.hide,products.image,brand.name as brandname from products,category,users,brand where products.user_id = users.id and cate_id = category.id and products.brand_id = brand.id order by id limit 7`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
}

module.exports = dashboard;