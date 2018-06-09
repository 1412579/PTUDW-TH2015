const pool = require('../model/pg');
var Brand = {
	new: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into brand(name,alias,description,created_at,image_brand) values('${ cateInfo.name }','${ cateInfo.alias }', '${cateInfo.description }','${ cateInfo.created_at }','${ cateInfo.image_brand }') RETURNING id`;
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
    insertCateBrand: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into brand_category(brand_id,cates_id) values(${ cateInfo.brand },${ cateInfo.cate })`;
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
            pool.query(`select * from brand order by id desc`, function(err, result){
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
            var query = `delete from brand where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
    }, 
    deleteCateBrand: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from brand_category where brand_id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
    }, 
    getById: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from brand where id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
    },
    getAllChild: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select cates_id from brand_category where brand_id = ${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    updateById: function(cateInfo){
        return new Promise((resolve,reject)=>{
            var query = `update brand set name = '${ cateInfo.name }', alias = '${ cateInfo.alias }', description = '${ cateInfo.description }', image_brand = '${ cateInfo.image_brand }' where id = ${ cateInfo.id}`;
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

module.exports = Brand;