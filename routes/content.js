
/*
 * GET home page.
 */
url = require('url');

var User = require('../models/user.js');
var TodoItem = require('../models/todoItem.js');

exports.deleteTodoItem = function (req, res) {
  var curUser = new User(res.locals.user);
  curUser.deleteTodoItem(req.params.id, function (err, r) {
    req.session.priority = "all";
    var queryObj = url.parse(req.url, true).query;

    // We can send back some element to client, and the user can modify the UI according to the responsed data.
    // Here we have no need to send the data for deleting item.
    res.send(queryObj.callback + '(\'{"message": "test"}\')');
  });
}

exports.addContent = function (req, res) {
  var newDate = new Date();
  var newTodoItem = new TodoItem(null, req.body['todoinput'], newDate.toDateString(), req.body['todoPriority']);

  var curUser = new User(res.locals.user);
 
  curUser.addTodoItem(newTodoItem, function (err, TodoItem) {
    var queryObj = url.parse(req.url, true).query;
    res.locals.user.TodoItems.push(newTodoItem);
    req.session.priority = "all";
    //res.send(queryObj.callback + '(\'{"id": newTodoItem.id }\')');
    res.send(queryObj.callback + '(\'{"id":' + newTodoItem.id + '}\')');
  });
}

exports.showContent = function (req, res) {
  var curUser = new User(res.locals.user);
  var selectPriority = req.params.select;

  curUser.getTodoItems(curUser.name, function (err, items) {
    for (var i = 0; i < items.length; i++) {
      var newTodoItem = new TodoItem(items[i].id, items[i].content, items[i].date, items[i].priority);
      if (null == selectPriority || newTodoItem.priority == selectPriority) {
        curUser.TodoItems.push(newTodoItem);
      }
    }
    if (selectPriority == null || selectPriority == undefined) {
      req.session.priority = "all";
    } else {
      req.session.priority = selectPriority;
    }
    res.locals.user = curUser;
    res.render('content', { title: '主页' });
  });
}