//app/controller/CategoryController.js

var express = require('express');
var router = express.Router();
var Brand = require('../model/brand.js');
var moment = require('moment');
var multer = require('multer');
var slug = require('slug');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'public/user/images/brand');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname.replace(' ',''));
	}
});

var upload = multer({ storage : storage }).single('brandimg');


router.get('/new', (req, res) => {
    Brand.getAllIndex()
    .then(result => {
        res.render('admin/new-brand',{
            layout: 'main-admin',
            title: 'Thêm thương hiệu mới',
            cate: result
        }); 
    })
    .catch(err => console.log(err));

    // res.render('admin/new-cate',{
    //         layout: 'main-admin',
    //         title: 'Thêm thương hiệu mới',
    //         // catalog: result
    // }); 
});

router.post('/new', (req, res) => {
    upload(req,res,(err) => {
        if(err) {
            return console.log(err);
        }
        console.log(req.body.cate);
        var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
        var alias = req.body.slug ? req.body.slug : slug(req.body.name,"-").toLowerCase();
        var cateInfo = {
            name: req.body.name,
            description: req.body.description,
            alias: alias,
            created_at: getTimeNow,
            parent_id: req.body.parent
        };
        if(req.file && req.file.filename){
            cateInfo.image_brand = '/user/images/brand/' + req.file.filename;
        }
        else{
            cateInfo.image_brand = '';
        }
        Brand.new(cateInfo)
        .then((result)=>{
            //console.log(result.rows[0].id);
            var asyncCalls = [];
            
            for (var i = 0; i < req.body.cate.length; i++) {
                var data = {
                    cate:  req.body.cate[i],
                    brand: result.rows[0].id
                }
                asyncCalls.push(
                    Brand.insertCateBrand(data).then(function(productObj){
                        console.log(`Thêm brand ${data.brand} và cate ${data.cate} `);
                    })
                )
            }
            Promise.all(asyncCalls).then(function(value) { 
                req.flash('messageCate', 'Đã thêm thương hiệu thành công!');
                res.redirect('/admin/brand/list');
            }, function(reason) {
                console.log(reason);
                res.end("Lỗi: " + reason);
            });
            
        })
        .catch(err=>console.log(err));
        
        
    });
    
});

router.get('/list', (req, res) =>{
    Brand.getAll()
    .then((result)=>{
        res.render('admin/list-brand',{
            list: result,
            layout: 'main-admin',
            title: 'Danh sách thương hiệu',
            message: req.flash('messageCate')[0]
        });
    })
    .catch((err) => {
        console.log(err);
        res.end();
    });
        
});

router.get('/edit/:id', (req, res) => {
    let catalog;
    let cateIn;
    Brand.getAll()
    .then(result => {
        catalog = result;
        return Brand.getById(req.params.id);
    })
    .then(result => {
        cateIn = result;
        return Brand.getAllChild(req.params.id);
    })
    .then(result => {
        let select;
        console.log(result.length);
        if(result.length === 0){
            for (var i = 0; i < catalog.length; i++) {
                if(catalog[i].id == cateIn.parent_id){
                    select += '<option selected value="'+ catalog[i].id +'">'+ catalog[i].name +'</option>';
                }
                else
                select += '<option value="'+ catalog[i].id +'">'+ catalog[i].name +'</option>';
            }
        }
        res.render('admin/edit-cate',{
            layout: 'main-admin',
            title: 'Sửa thương hiệu',
            cate: cateIn,
            catelist: select
        }); 
    })
    .catch(err=>console.log(err));
});

router.post('/edit/:id', (req,res)=>{
    var temp = req.body.checkbox ? 1 : 0;
    console.log(req.body.checkbox);
    console.log(temp);
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var alias = req.body.slug ? req.body.slug : slug(req.body.name,"-").toLowerCase();
    
    var cataInfo = {
        id: req.body.id,
        name: req.body.name,
        alias: alias,
        ishide: temp,
        updated_at: getTimeNow,
        parent_id: req.body.parent
    };
    console.log(cataInfo);
    Brand.updateById(cataInfo)
    .then(() => {
        req.flash('messageCate', 'Đã sửa thương hiệu thành công!');
        res.redirect('/admin/category/list');
    })
    .catch(err => console.log(err));
})

router.get('/delete/:id',(req,res) => {
    Brand.delete(req.params.id)
    .then(result => {
        return Brand.deleteCateBrand(req.params.id);
    })
    .then( result => {
        console.log('Xoá thương hiệu thành công!');
        req.flash('messageCate', 'Đã xoá thương hiệu thành công!');
        res.redirect('/admin/brand/list');
    })
    .catch(err => {
        console.error(err);
    });
})

module.exports = router;


