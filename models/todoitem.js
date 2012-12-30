var mongo = require('./db');

function TodoItem(id, content, date, priority) {
  this.id = id;
  this.content = content;
  this.date = date;
  this.priority = priority;
}

module.exports = TodoItem;