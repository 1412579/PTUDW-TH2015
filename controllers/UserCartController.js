var express = require('express');
var router = express.Router();
var Category = require('../model/category.js');

router.get('/', (req, res) => {
   res.render('cart',{title: "giohanng"});
});

module.exports = router;