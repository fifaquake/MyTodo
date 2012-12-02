var mongodb = require('./db');
var TodoItem = require('./todoitem');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.TodoItems = [];
}
module.exports = User;

User.prototype.addTodoItem = function addTodoItem(item, callback) {
  var curUser = this;
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('todoitems', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      var newTodoItem = {
        id: item.id,
        name: curUser.name,
        content: item.content,
        date: item.date,
        priority: item.priority
      };
      collection.insert(newTodoItem, { safe: true }, function (err, user) {
        mongodb.close();
        callback(err, newTodoItem);
      });
    });
  });
};

User.prototype.save = function save(callback) {
  var user = {
    name: this.name,
    password: this.password,
  };

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.ensureIndex('name', { unique: true });

      collection.insert(user, { safe: true }, function (err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
};

User.prototype.deleteTodoItem = function deleteTodoItem(idTodoItem, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('todoitems', function (err, collection) {
      if (err) {
        mongodb.close();
      }

      collection.remove({ id: idTodoItem }, function (err, r) {
        mongodb.close();
        callback(err, null);
      });
    });
  });
};

User.prototype.getTodoItems = function getTodoItems(username, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('todoitems', function (err, collection) {
      if (err) {
        mongodb.close();
      }

      collection.find({ name: username }, function (err, docs) {
        if (docs) {
          docs.toArray(function (err, items) {
            mongodb.close();
            callback(err, items);
          });
        } else {
          mongodb.close();
          callback(err, null);
        }
      });
    });
  });
};
User.get = function get(username, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        callback(err);
      }
      collection.findOne({ name: username }, function (err, doc) {
        mongodb.close();
        if (doc) {
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
};
