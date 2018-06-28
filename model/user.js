var bcrypt = require('bcrypt-nodejs');
const pool = require('../model/pg');

var user = {
	changePassword: function(userId, oldPassword, newPassword, retypeNewPassword) {
		const _self = this;
		return new Promise((resolve,reject)=>{
			_self.getUser(userId)
				.then(function(user) {
				if (newPassword !== retypeNewPassword)
				{
					resolve(-1);
				}
				else if (bcrypt.compareSync(oldPassword, user.password))
				{
					var hashedNewPassword = bcrypt.hashSync(newPassword, null, null);
					var query = `update users set password = '${hashedNewPassword}' where id = ${userId}`;
					console.log(query);
					pool.query(query, function(err, result){
		                if (err){
		                    resolve(-2);
		                }
		                else
		                {
		                	resolve(1);
		                }
		            });
				}
				else
					resolve(0);
			})
				.catch(function(err) {
					resolve(-2);
				})
		})
	},
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
                    resolve(0);
                }
                else
                {
                	resolve(1);
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