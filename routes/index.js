﻿
/*
 * GET home page.
 */
var crypto = require('crypto');
var User = require('../models/user.js');
var TodoItem = require('../models/todoItem.js');

exports.index = function (req, res) {
  res.render('index', { title: '主页' });

  return;
}

exports.deleteTodoItem = function (req, res) {
  var curUser = new User(res.locals.user);
  curUser.deleteTodoItem(req.params.id, function (err, r) {
    res.redirect('/content');
  });
}

exports.addContent = function (req, res) {
  var newDate = new Date();
  var newTodoItem = new TodoItem(null, req.body['todoinput'], newDate.toDateString(), req.body['todoPriority']);

  var curUser = new User(res.locals.user);

  curUser.addTodoItem(newTodoItem, function (err, TodoItem) {
    res.locals.user.TodoItems.push(newTodoItem);
    return res.redirect('content');
  });
}

exports.showContent = function (req, res) {
  var curUser = new User(res.locals.user);
  curUser.getTodoItems(curUser.name, function (err, items) {
    for (var i = 0; i < items.length; i++) {
      var newTodoItem = new TodoItem(items[i].id, items[i].content, items[i].date, items[i].priority);
      curUser.TodoItems.push(newTodoItem);
    }
    res.locals.user = curUser;
    res.render('content', { title: '主页' });
  });
}

exports.reg = function (req, res) {
  res.render('register', { title: '注册' });
  return;
}

exports.logout = function (req, res) {
  req.session.user = null;

  return res.redirect('/');
}

exports.login = function (req, res) {

  res.render('login', { title: '登陆' });

  return;
}

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
    };
    if (newUser.password != user.password) {
      return res.redirect('/login');
    };
    req.session.user = newUser;
    res.redirect('/content');
  });
}
exports.doReg = function (req, res) {
  if (req.body['repeat_password'] != req.body['password']) {
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
}