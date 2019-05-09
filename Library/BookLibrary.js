var databaseHandler = require('./database/Database');
var Book = require('./Book');

function BookLibrary() {}
BookLibrary.prototype.create = function(title, category, author) {
  var book = new Book(title, category, author, getTodayDate(), generateId());
  save(book);
  console.log(book);
  return book;
};

BookLibrary.prototype.getByTitle = function(title) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].title === title) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

BookLibrary.prototype.getByAuthor = function(author) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].author === author) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

BookLibrary.prototype.getByDate = function(date) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].date === date) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

BookLibrary.prototype.getBooks = function() {
  return databaseHandler['books'];
};

BookLibrary.prototype.updateTitle = function(book, newTitle) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].id == book.id) {
      books[index].title = newTitle;
      return books[index];
    }
  }
};

BookLibrary.prototype.delete = function(book) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].id === book.id) {
      books.splice(index, 1);
      return true;
    }
  }
};

BookLibrary.prototype.deleteAll = function(book) {
  var books = this.getBooks();
  books.splice(0, books.length);
  return books.length;
};

function save(book) {
  databaseHandler['books'].push(book);
}

function generateId() {
  var books = databaseHandler['books'];
  return books.length > 0 ? books[books.length - 1].id + 1 : 1;
}

function getTodayDate() {
  return new Date().toLocaleDateString();
}
module.exports = BookLibrary;
