var mongodb = require('./db');
var TodoItem = require('./todoitem');

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.TodoItems = [];
	this.TodoItems[0] = new TodoItem("First Task", "2012-11-01", 0);
	this.TodoItems[1] = new TodoItem("Second Task", "2012-11-03", 1);
};
module.exports = User;

User.prototype.save = function save(callback){
	var user = {
		name:this.name,
		password:this.password,
	};

	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			collection.ensureIndex('name', {unique:true});

			collection.insert(user, {safe:true}, function(err, user) {
				mongodb.close();
				callback(err,user);
			});
		});
	});
}

User.get = function get(username, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				callback(err);
			}
			collection.findOne({name:username}, function(err, doc){
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
