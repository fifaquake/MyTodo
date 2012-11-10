var mongo = require('./db');
var GUID = require('../utility/GUID');

function TodoItem(id, content, date, priority) {
  if (null == id) {
    this.id = GUID();
  } else {
    this.id = id;
  }

  this.content = content;
  this.date = date;
  this.priority = priority;
}

module.exports = TodoItem;