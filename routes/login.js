var crypto = require('crypto');
var User = require('../models/user.js');

exports.login = function (req, res) {

  res.render('login', { title: '登陆' });

  return;
};

exports.doLogin = function (req, res) {
  var md5 = crypto.createHash('md5');
  var md5Password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.userName,
    password: md5Password,
  });

  User.get(newUser.name, function (err, user) {
    if (!user) {
      return res.redirect('/login');
    }
    if (newUser.password != user.password) {
      return res.redirect('/login');
    }
    req.session.user = newUser;
    req.session.priority = 'all';
    res.redirect('/content');
  });
};