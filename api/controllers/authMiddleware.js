var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.requiresLogin = function (req, res, next) {
  console.log('middle', req.method);
  if (req.session && req.session.userId) {
    User.checkPerm(req.session.userId, req.method, function(err, user) {
      if (err) {
        res.json({message: `${user.username}: You don\'t have the necessary permissions to access this.`, status: err});
        res.end();
      } else {
        return next();
      }
    });
  } else {
    res.json({message: 'You must be logged in to view this page. Go to /authenticate to login.', status: 401});
  }
}