var bcrypt = require('bcrypt-nodejs');
const pool = require('../model/pg');

var user = {
	update: function(info) {
		return new Promise((resolve,reject)=>{
			const _self = this;
            var query = `update users set fullname = '${info.fullname}',
            							  address = '${info.address}',
            							  province = '${info.province}',
            							  sexual = '${info.sexual}',
            							  email = '${info.email}',
            							  birth = '${info.birth}'
            					where id = ${info.id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                {
                	var userId = info.id;
                	resolve(_self.getUser(userId));
                }
            });
        });
	},
	getUser: function(id) {
		return new Promise((resolve,reject)=>{
            var query = `select *
            			 from users
            			 where id = ${id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows[0]);
            });
        });
	}
};

module.exports = user;