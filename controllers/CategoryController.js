//app/controller/CategoryController.js

var express = require('express');
var router = express.Router();
var Category = require('../model/category.js');
var moment = require('moment');
var slug = require('slug');

router.get('/new', (req, res) => {
    Category.getAll()
    .then(result => {
        res.render('admin/new-cate',{
            layout: 'main-admin',
            title: 'Thêm loại sản phẩm mới',
            cate: result
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
    console.log(req.body.name);
    console.log(req.body.slug);

    var temp = req.body.checkbox ? 1 : 0;
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var alias = req.body.slug ? req.body.slug : slug(req.body.name,"-").toLowerCase();
    var cateInfo = {
        name: req.body.name,
        orderb: 0,
        alias: alias,
        isHide: temp,
        created_at: getTimeNow,
        updated_at: getTimeNow,
        parent_id: req.body.parent
    };

    Category.newCate(cateInfo)
    .then(()=>{
        req.flash('messageCate', 'Đã thêm loại sản phẩm thành công!');
        res.redirect('/admin/Category/list');
    })
    .catch(err=>console.log(err));
});

router.get('/list', (req, res) =>{
    Category.getAllIndex()
    .then((result)=>{
        res.render('admin/list-cate',{
            list: result,
            layout: 'main-admin',
            title: 'Danh sách loại sản phẩm',
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
    Category.getAll()
    .then(result => {
        catalog = result;
        return Category.getById(req.params.id);
    })
    .then(result => {
        cateIn = result;
        return Category.getAllChild(req.params.id);
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
            title: 'Sửa loại sản phẩm',
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
    Category.updateById(cataInfo)
    .then(() => {
        req.flash('messageCate', 'Đã sửa loại sản phẩm thành công!');
        res.redirect('/admin/category/list');
    })
    .catch(err => console.log(err));
})

router.get('/delete/:id',(req,res) => {
    Category.delete(req.params.id)
    .then(result => {
        return Category.updateChildById(req.params.id);
    })
    .then( result => {
        console.log('Xoá loại sản phẩm thành công!');
        req.flash('messageCate', 'Đã xoá loại sản phẩm thành công!');
        res.redirect('/admin/category/list');
    })
    .catch(err => {
        console.error(err);
    });
})

module.exports = router;


