var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const PERMS = {
  admin: ['GET', 'POST', 'PUT', 'DELETE'],
  client: ['GET']
}


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'client',
    enum: ['client', 'admin']
   },
   accessToken: {
    type: String
   }
});

// authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// authenticate input against database
UserSchema.statics.checkPerm = function (userId, method, callback) {
  User.findOne({ _id: userId })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      if (PERMS[user.role].includes(method)) {
        return callback(null, user);
      } else {
        return callback(403, user);
      }
    });
}

// hashing the user password before saving it to mongo
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;