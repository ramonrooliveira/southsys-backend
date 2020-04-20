'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

// auth
exports.authenticate = (req, res) => {

  if (req.body && req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function(err, user) {
      if (err) {
        res.status(err.status).json({message: 'Username and/or password do not match.', status: err.status});
        res.end();
      } else {
        req.session.userId = user._id;
        res.status(200).json({message: `User ${user.username} is authenticated!`, status: 200});
      }
    });
  } else {
    res.status(401).json({ message: 'Please, provide username and password', status: 401});
    res.end();
  }
};

// logout
exports.logout = (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        res.status(200).json({message: 'User is logged out!', status: 200});
      }
    });
  }
};

exports.create_user = (req, res) => {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if(err) {
      res.status(err.code).json({ message: err.errmsg, status: err.code });
    } else {
      res.status(200).json({ message: `User successfully created!`, user });
    }
  });
};
  
