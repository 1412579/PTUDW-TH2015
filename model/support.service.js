const pool = require('../model/pg');


let service = {
    getProvince: (cartInfo) => {
        console.log(cartInfo)
        return new Promise((resolve,reject)=>{
            pool.query(`select * from provinces order by id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
    },

    getCity: (id) =>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from districs where province_id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
    },
}

module.exports = service;