'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

// Can be called without parameters, with a pagination limit, or with a pagination limt and page
// format: /products | /products/limit | /products/limit/page
exports.list_all_products = (req, res) => {
  const options = {
    page: parseInt(req.params.page) || 1,
    limit: parseInt(req.params.limit) || 2000
  };

  Product.paginate({}, options).then(products => {
      res.status(200).json(products.docs);
  }).catch( err => {throw new Error(err);} );
};

exports.create_a_product = (req, res) => {
  var newProduct = new Product(req.body);
  newProduct.save(function(err, product) {
    if(err) {
      res.status(err.code).json({ message: err.errmsg, status: err.code });
    } else {
      res.status(200).json({ message: `Product successfully created!`, product });
    }
  });
};


exports.read_a_product = (req, res) => {
  Product.findById(req.params.productId).then(product => {
    if (!product) {
      res.status(500).json({message: 'No products match this id.', status: 500});
    } else {
      res.status(200).json({message: 'Product matching id returned.', product, status: 200});
    }
  }).catch( err => {throw new Error(err);} );
};


exports.update_a_product = (req, res) => {
  Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}).then(product => {
    if (!product) {
      res.status(500).json({message: 'Could not find a product with this id.', status: 500});
    } else {
      res.status(200).json({message: `Product ${product.id} updated successfully!`, status: 200});
    }
  }).catch( err => {throw new Error(err);} );
};


exports.delete_a_product = (req, res) => {
  Product.remove({
    _id: req.params.productId
  }).then(product => {
    res.status(200).json({ message: `Product successfully deleted`, status: 200 });
  }).catch( err => {throw new Error(err);} );
};


exports.search_a_product = (req, res) => {
  Product.find({ "name" : { $regex: new RegExp(req.params.productName), $options: 'i' } }).then(product => {
    if (!product) {
      res.status(500).json({message: 'No products match this search.', status: 500});
    } else {
      res.status(200).json({message: 'Products matching search returned.', product, status: 200});
    }
  }).catch( err => {throw new Error(err);} );
};
