const pool = require('../model/pg');
var Order = {
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            //select orders.*, order_details.*, users.*,order_status.name as status from orders,order_details,users,order_status where orders.id = order_details.order_id and orders.order_status_id = order_status.id and orders.user_id = users.id order by orders.id
            pool.query(`select orders.created_at as timeorder, 
                                orders.id as orderid, 
                                users.fullname as username, 
                                users.phone as userphone,
                                order_status.name as status,
                                order_status.id as statusid, 
                                orders.total as total 
                        from orders,users,order_status 
                        where orders.order_status_id = order_status.id 
                            and orders.user_id = users.id 
                        order by orders.created_at`, function(err, result){
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
            pool.query(`select orders.created_at as timeorder, 
                                orders.id as orderid, 
                                users.address as useraddress, 
                                users.fullname as username, 
                                users.phone as userphone,
                                order_status.name as status,
                                order_status.id as statusid, 
                                orders.total as total 
                        from orders, users,order_status 
                        where orders.order_status_id = order_status.id 
                            and orders.user_id = users.id 
                            and orders.id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
    },
    getOrdersByUserId: (userId) => {
        return new Promise((resolve,reject)=>{
            pool.query(`select s.name as status,
                               o.id as id,
                               o.total,
                               s.id as statusId,
                               o.created_at as createdDate
                            from orders o
                                inner join users u on o.user_id = u.id
                                inner join order_status s on o.order_status_id = s.id
                        where u.id = ${userId}
                        order by o.created_at desc, o.id desc`, 
            function(err, result){
                if (err){
                    reject(err);
                }
                else
                {
                    resolve(result.rows);
                }
            });
        });       
    },
    getOrderDetail: (orderId) => {
        return new Promise((resolve,reject)=>{
            pool.query(`select product_id,
                               product_name,
                               buying_price as unit_price,
                               d.quantity,
                               buying_price * d.quantity as bought_price, 
                               p.image
                        from order_details d
                        inner join orders o on d.order_id = o.id
                        left join products p on p.id = d.product_id
                        where o.id = ${orderId}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
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
    }
}

module.exports = Order;