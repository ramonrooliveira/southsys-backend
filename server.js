var dotenv = require('dotenv');
var cors = require('cors');
var session = require('express-session');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel.js'), //created model loading here
  User = require('./api/models/userModel.js'), //created model loading here
  bodyParser = require('body-parser');

dotenv.config();
var url = process.env.MONGODB_URI;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

// fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url); 

//use sessions for tracking logins
app.use(session({
  secret: 'llama-dog',
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// import and register routes
var routes = require('./api/routes/routes');
routes(app);

// 404 middleware
app.use(function(req, res) {
  res.status(404).send({
    status: 404,
    url: req.originalUrl + ' not found'
  })
});

app.listen(port);
console.log('API server started on: ' + port);
module.exports = { app }