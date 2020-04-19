'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function(req, res) {
  Product.find({}, function(err, product) {
    res.json(product);
  }).catch( err => {throw new Error(err);} );
};

exports.create_a_product = function(req, res) {
  var newProduct = new Product(req.body);
  newProduct.save(function(err, product) {
    res.json(product);
  }).catch( err => {throw new Error(err);} );
};


exports.read_a_product = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    res.json(product);
  }).catch( err => {throw new Error(err);} );
};


exports.update_a_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
    res.json(product);
  }).catch( err => {throw new Error(err);} );
};


exports.delete_a_product = function(req, res) {
  Product.remove({
    _id: req.params.productId
  }, function(err, product) {
    res.json({ message: `Product successfully deleted` });
  }).catch( err => {throw new Error(err);} );
};
