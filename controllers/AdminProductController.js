//app/controller/CategoryController.js

var express = require('express');
var router = express.Router();
var Product = require('../model/adminproduct.js');
var Brand = require('../model/brand.js');
var Category = require('../model/category.js');
var moment = require('moment');
var slug = require('slug');

router.get('/new', (req, res) => {
    var category;
    Category.getAllIndex()
    .then(result => {
        category = result;
        return Brand.getAll();
    })
    .then(result => {
        res.render('admin/new-product',{
            layout: 'main-admin',
            title: 'Thêm sản phẩm mới',
            brand: result,
            cate: category
        }); 
    })
    .catch(err => console.log(err));

    // res.render('admin/new-cate',{
    //         layout: 'main-admin',
    //         title: 'Thêm loại sản phẩm mới',
    //         // catalog: result
    // }); 
});

router.post('/new', (req, res) => {
    //console.log(req.body.name);
    //console.log(req.body.slug);

    var temp = req.body.checkbox ? 1 : 0;
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var cateInfo = {
        name: req.body.name,
        alias: slug(req.body.name,"-").toLowerCase(),
        price: req.body.price,
        description: req.body.description,
        user_id: 10,
        cate_id: req.body.cate,
        created_at: getTimeNow,
        updated_at: getTimeNow,
        hide: temp,
        brand_id: req.body.brand,
        counting_sell: 0,
        inventory: req.body.inventory,
        discount: req.body.discountvalue
    };

    Product.new(cateInfo)
    .then(()=>{
        req.flash('messageCate', 'Đã thêm sản phẩm thành công!');
        res.redirect('/admin/product/list');
    })
    .catch(err=>console.log(err));
});

router.get('/list', (req, res) =>{
    Product.getAll()
    .then((result)=>{
        res.render('admin/list-product',{
            list: result,
            layout: 'main-admin',
            title: 'Danh sách sản phẩm',
            message: req.flash('messageCate')[0]
        });
    })
    .catch((err) => {
        console.log(err);
        res.end();
    });
        
});

router.get('/edit/:id', (req, res) => {

    var categorys;
    var brands;
    Category.getAllIndex()
    .then(result => {
        categorys = result;
        return Brand.getAll();
    })
    .then(result => {
        brands = result;
        return Product.getById(req.params.id)
    })
    .then(result => {
        let selectCate;
        let selectBrand;
        for (var i = 0; i < categorys.length; i++) {
            if(categorys[i].id == result.cate_id){
                selectCate += '<option selected value="'+ categorys[i].id +'">'+ categorys[i].name +'</option>';
            }
            else
            selectCate += '<option value="'+ categorys[i].id +'">'+ categorys[i].name +'</option>';
        }
        for (var i = 0; i < brands.length; i++) {
            if(brands[i].id == result.brand_id){
                selectBrand += '<option selected value="'+ brands[i].id +'">'+ brands[i].name +'</option>';
            }
            else
            selectBrand += '<option value="'+ brands[i].id +'">'+ brands[i].name +'</option>';
        }
        res.render('admin/edit-product',{
            layout: 'main-admin',
            title: 'Sửa sản phẩm',
            product: result,
            catelist: selectCate,
            brandlist: selectBrand
        }); 
    })
    .catch(err => console.log(err));
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
    Category.updateById(cataInfo)
    .then(() => {
        req.flash('messageCate', 'Đã sửa loại sản phẩm thành công!');
        res.redirect('/admin/category/list');
    })
    .catch(err => console.log(err));
})

router.get('/delete/:id',(req,res) => {
    Product.delete(req.params.id)
    .then( result => {
        console.log('Xoá sản phẩm thành công!');
        req.flash('messageCate', 'Đã xoá sản phẩm thành công!');
        res.redirect('/admin/product/list');
    })
    .catch(err => {
        console.error(err);
    });
})

module.exports = router;


