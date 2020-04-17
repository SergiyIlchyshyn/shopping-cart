var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
        console.log(docs);
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

        res.render('shop/index', { title: 'Shopping Cart', products: docs });
    });
});

module.exports = router;