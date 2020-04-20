'use strict';
module.exports = function(app) {
  var products = require('../controllers/productController');
  var users = require('../controllers/userController');
  var auth = require('../controllers/authMiddleware');

  // auth middleware 
  app.use(['/product*', '/users'], auth.requiresLogin);

  // products Routes
  app.route('/products/:limit?/:page?')
    .get(products.list_all_products)
    .post(products.create_a_product);


  app.route('/products/:productId')
    .get(products.read_a_product)
    .put(products.update_a_product)
    .delete(products.delete_a_product);


  app.route('/productSearch/:productName')
    .get(products.search_a_product);

    
  // users Routes

  app.route('/authenticate')
    .post(users.authenticate);

  app.route('/logout')
    .get(users.logout);

  app.route('/users')
    .post(users.create_user);
};