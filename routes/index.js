var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, products) {
        // console.log(products);
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
    let productModel = new Product({
        imagePath: req.body.imagePath,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        availability: req.body.availability,
        season: req.body.season,
        materials: req.body.materials,
        country: req.body.country
    });
    productModel
        .save()
        .then(result => res.redirect('/'))
        .catch(err => {
            consolo.error(err.message);
            throw err;
        });
});
//отримати дані і зберегти їх
router.get('/edit-product/:id', function(req, res, next) {
    Product.findById(req.params.id)
        .then(product => res.render('shop/edit-product', { title: 'Edit', product: product }))
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});
router.post('/edit-product/:id', function(req, res, next) {
    //записати в БД
    Product.findByIdAndUpdate(req.params.id, {
            imagePath: req.body.imagePath,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            color: req.body.color,
            size: req.body.size,
            availability: req.body.availability,
            season: req.body.season,
            materials: req.body.materials,
            country: req.body.country
        })
        .then(r => {
            console.log(r);
            res.redirect('/');
        })
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});
router.get('/delete-product/:id', function(req, res, next) {
    //видалити
    // res.render('shop/delete-product', { title: 'Delete', message: 'Deleted!' });
    Product.findByIdAndDelete(req.params.id)
        .then(p => {
            res.redirect('/');
        })
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});

module.exports = router;