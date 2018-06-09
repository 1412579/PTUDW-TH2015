const pool = require('../model/pg');
var products = {
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
}

module.exports = products;