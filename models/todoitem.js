var mongo = require('./db');
function TodoItem(content, date, status) {
  this.content = content;
  this.date = date;
  this.status = status;
}

module.exports = TodoItem;