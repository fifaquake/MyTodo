var crypto = require('crypto');
var User = require('../models/user.js');

exports.index = function (req, res) {
  res.render('index', { title: '主页' });

  return;
};

exports.reg = function (req, res) {
  res.render('register', { title: '注册' });
  return;
};

exports.doReg = function (req, res) {
  if (req.body.repeat_password != req.body.password) {
    //req.flash('info', 'Different Passwords!');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5');
  var md5passsword = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.userName,
    password: md5passsword,
  });

  User.get(newUser.name, function (err, user) {
    if (user) {
      err = 'Username already exists.';
    }
    if (err) {
      //req.flash('error', err);
      return res.redirect('/reg');
    }

    newUser.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      //req.flash('success', 'Successfully registered!');
      res.redirect('/');
    });
  });
};