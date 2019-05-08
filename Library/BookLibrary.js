var Book = require('./Book');
var databaseHandler = require('./database/Database');

function BookLibrary(title, category, quantity, author) {
  this.title = title;
  this.category = category;
  this.quantity = quantity;
  this.author = author;
  this.dateAdded = getTodayDate();
}
BookLibrary.prototype.getBookTitle = function() {
  return Book.prototype.getTitle();
};

BookLibrary.prototype.saveBook = function() {
  var book = new Book(
    this.title,
    this.category,
    this.quantity,
    this.author,
    this.dateAdded
  );
  databaseHandler['books'].push(book);
  return book;
};

function getTodayDate() {
  return new Date().toLocaleDateString();
}

module.exports = BookLibrary;
