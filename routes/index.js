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
//==============================================================================
router.get('/add-product', function(req, res, next) {
    res.render('shop/add-product', { title: 'Create' });
});
//отримати дані і зберегти їх
router.post('/add-product', function(req, res, next) {
    // console.log(req.body);  
    let productModel = new Product({
        imagePath: req.body.productImage,
        title: req.body.productTitle,
        description: req.body.productDescription,
        price: req.body.productPrice,
        color: req.body.productColor,
        size: req.body.size,
        availability: req.body.availability,
        season: req.body.season,
        materials: req.body.productMaterials,
        country: req.body.productCountry
    });
    //записати в БД
    productModel.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            consolo.error(err.message);
            throw err;
        });
});
//==============================================================================
//отримати дані і зберегти їх
router.get('/edit-product/:id', function(req, res, next) {
    Product.findById(req.params.id)
        .then(product => res.render('shop/edit-product', { title: 'Edit - ' + product.title, product: product }))
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});
router.post('/edit-product/:id', function(req, res, next) {
    // console.log(req.body);
    var productId = req.params.id;
    var update = {
        imagePath: req.body.productImage,
        title: req.body.productTitle,
        description: req.body.productDescription,
        price: req.body.productPrice,
        color: req.body.productColor,
        // size: req.body.size,
        // availability: req.body.availability,
        // season: req.body.season,
        materials: req.body.productMaterials,
        country: req.body.productCountry
    };
    //записати зміни в БД
    Product.findByIdAndUpdate(productId, update)
        .then(result => {
            // console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});
//==============================================================================
router.get('/delete-product/:id', function(req, res, next) {
    // видалити
    Product.findByIdAndDelete(req.params.id)
        .then(p => {
            res.redirect('/');
        })
        .catch(err => {
            consolo.error(err.message);
            throw err;
        })
});
//==============================================================================
module.exports = router;