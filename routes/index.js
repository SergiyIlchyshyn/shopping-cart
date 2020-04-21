var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, products) {
        // console.log(docs);
        // var products = [];
        // if (err) {
        //     // return res.send(err);
        //     res.send(err);
        // } else {
        //     var keys = Object.keys(docs);
        //     keys.forEach(function(key) {
        //         products.push(docs[key]);
        //     });
        //     res.render('shop/index', { title: 'Shopping Cart', products: products });
        //     console.log(products);
        //     // return res.json(docs);
        // }

        res.render('shop/index', { title: 'Women Clothing Store', products: products });
    });
});

router.get('/add-product', function(req, res, next) {
    res.render('shop/add-product', { title: 'Create' });
});
//отримати дані і зберегти їх
router.post('/add-product', function(req, res, next) {
    console.log(req.body);
    //записати в БД
    res.redirect('/');
});
//отримати дані і зберегти їх
router.get('/edit-product/:id', function(req, res, next) {
    res.render('shop/edit-product', { title: 'Edit' });
});
router.post('/edit-product/:id', function(req, res, next) {
    console.log(req.body);
    //записати в БД
    res.redirect('/');
});
router.get('/delete-product/:id', function(req, res, next) {
    console.log(req.params.id);
    //видалити
    res.render('shop/delete-product', { title: 'Delete', message: 'Deleted!' });
});

module.exports = router;