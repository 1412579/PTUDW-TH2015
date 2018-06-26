const pool = require('../model/pg');
var productsRepo = require('../model/product.js')

let orderDetail = {
    newOrderDetail: (cartInfo) => {
        console.log(cartInfo)
        return new Promise((resolve,reject)=>{
            var query = `insert into order_details(product_id,product_name,quantity,created_at,
                        updated_at,order_id,buying_price) 
                        values(${cartInfo.ProId },'${ cartInfo.name }', ${cartInfo.Quantity},
                        '${cartInfo.created_at}','${cartInfo.updated_at}',${cartInfo.order_id}, ${cartInfo.Amount})`;
            // var query = `insert into order_details(product_id,product_name,quantity,order_id,buying_price) 
            //     values(${ cartInfo.ProId },${ cartInfo.name }, ${cartInfo.Quantity},
            //             ${cartInfo.order_id}, ${cartInfo.Amount})`;
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

module.exports = orderDetail;