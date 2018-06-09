const pool = require('../model/pg');
var Category = {
	newCate: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into category(name,alias,orderb,hide,created_at,updated_at,parent_id) values('${ cateInfo.name }','${ cateInfo.alias }', ${cateInfo.orderb },${ cateInfo.isHide},'${ cateInfo.created_at }','${ cateInfo.updated_at }',${ cateInfo.parent_id })`;
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
            pool.query(`select * from category where parent_id = 0 order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    getAllIndex: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
    },
    getAllChild: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from category where parent_id = ${id} order by orderb asc, id desc`, function(err, result){
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
    },
    updateChildById: function(id){
        return new Promise((resolve,reject)=>{
            var query = `update category set parent_id = 0 where parent_id = ${id}`;
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
	visible: function(cateInfo,callback){
		return new Promise((resolve,reject)=>{
            console.log(cateInfo);
            var query = `update category set ishide = ${cateInfo.hide} where id = ${cateInfo.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
	},
	delete: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from category where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
	},
    getDetailedCategory: function() {
        let categories = [];
        return this.getAll()
            .then((result) => {
                categories = result;
                let promises = [];
                for (var i =0; i < result.length; i++)
                {
                    let index = i;
                    promises.push(this.getAllChild(result[i].id)
                                        .then((children) => { 
                                            categories[index].children = children;
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })); 
                }
                return Promise.all(promises)
                    .then(() => {
                        return categories;
                    }, Promise.resolve());
                
            })
    }
}

module.exports = Category;