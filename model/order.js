const pool = require('../model/pg');
var Category = {
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            //select orders.*, order_details.*, users.*,order_status.name as status from orders,order_details,users,order_status where orders.id = order_details.order_id and orders.order_status_id = order_status.id and orders.user_id = users.id order by orders.id
            pool.query(`select orders.created_at as timeorder, orders.id as orderid, users.fullname as username, users.phone as userphone,order_status.name as status,order_status.id as statusid, orders.total as total from orders,users,order_status where orders.order_status_id = order_status.id and orders.user_id = users.id order by timeorder desc`, function(err, result){
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
            pool.query(`select orders.created_at as timeorder, orders.id as orderid, users.address as useraddress, users.fullname as username, users.phone as userphone,order_status.name as status,order_status.id as statusid, orders.total as total from orders,users,order_status where orders.order_status_id = order_status.id and orders.user_id = users.id and orders.id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
    },
    getProducts: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from order_details where order_id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        });
	},
	updateStatusById: function(cateInfo){
        return new Promise((resolve,reject)=>{
            var query = `update orders set order_status_id = ${cateInfo.status} where id = ${ cateInfo.id}`;
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
    newOrder: (orderInfo) => {
        console.log(orderInfo)
        return new Promise((resolve,reject)=>{
            var query = `insert into orders(user_id,total,adress,email,created_at,
                        updated_at,phone,order_status_id) 
                        values(${orderInfo.User_id},${ orderInfo.Total }, '${orderInfo.adress}',
                        '${orderInfo.email}','${orderInfo.created_at}','${orderInfo.updated_at}','${orderInfo.phone}',${orderInfo.order_status_id})`;
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
}

module.exports = Category;