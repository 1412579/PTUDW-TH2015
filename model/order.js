const pool = require('../model/pg');
var Category = {
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            //select orders.*, order_details.*, users.*,order_status.name as status from orders,order_details,users,order_status where orders.id = order_details.order_id and orders.order_status_id = order_status.id and orders.user_id = users.id order by orders.id
            pool.query(`select orders.created_at as timeorder, orders.id as orderid, users.fullname as username, users.phone as userphone,order_status.name as status,order_status.id as statusid, orders.total as total from orders,users,order_status where orders.order_status_id = order_status.id and orders.user_id = users.id order by orders.id`, function(err, result){
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
            pool.query(`select * from category where id=${id}`, function(err, result){
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
            var query = `update category set parent_id = ${cateInfo.parent_id},name = '${ cateInfo.name }', alias = '${ cateInfo.alias }', updated_at = '${ cateInfo.updated_at }', hide = ${ cateInfo.ishide } where id = ${ cateInfo.id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    }
}

module.exports = Category;