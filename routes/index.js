var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
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

        res.render('shop/index', { title: 'Shopping Cart', products: docs });
    });
});

router.get('/user/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});
router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;