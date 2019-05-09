var databaseHandler = require('../Library/database/Database');

function Book(title, category, author, date) {
  this.id = generateBookId();
  this.title = title;
  this.category = category;
  this.author = author;
  this.date = getTodayDate();
}
function generateBookId() {
  var books = databaseHandler['books'];
  return books.length > 0 ? books[books.length - 1].id + 1 : 1;
}

function getTodayDate() {
  return new Date().toLocaleDateString();
}
module.exports = Book;
