var dotenv = require('dotenv');
var = require('cors');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel.js'), //created model loading here
  bodyParser = require('body-parser');
  

dotenv.config();
var url = process.env.MONGODB_URI;
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(url); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var routes = require('./api/routes/productRoutes'); //importing route
routes(app); //register the route

// 404 middleware
app.use(function(req, res) {
  res.status(404).send({
    status: 404,
    url: req.originalUrl + ' not found'
  })
});


app.listen(port);


console.log('products RESTful API server started on: ' + port);