var User = require('./User');
var Book = require('../Library/Book');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

function Admin(firstName, lastName) {
  User.call(this, firstName, lastName, 'ADMIN');
}
InheritProperty(User, Admin);

Admin.prototype.searchUserByID = function(id) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === id) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.searchUserByName = function(name) {
  var users = this.getUsers(),
    results = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].firstName === name || users[index].lastName === name) {
      results.push(users[index]);
    }
  }
  return results.length === 0 ? false : results;
};

Admin.prototype.deleteUser = function(user) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === user.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

Admin.prototype.readStudent = function(matricNumber) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].matricNumber === matricNumber) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.readTeacher = function(staffId) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].staffId === staffId) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.addBook = function(title, category, author) {
  var book = new Book(title, category, author);
  saveBook(book);
  console.log(book);
  return book;
};

Admin.prototype.getBooksByTitle = function(title) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].title === title) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

Admin.prototype.getBooksByAuthor = function(author) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].author === author) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

Admin.prototype.getBooksByDate = function(date) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].date === date) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound;
};

Admin.prototype.getUsers = function() {
  return databaseHandler['users'];
};

Admin.prototype.getBooks = function() {
  return databaseHandler['books'];
};

Admin.prototype.updateBookTitle = function(id, newTitle) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].id == id) {
      books[index].title = newTitle;
      return books[index];
    }
  }
  return false;
};

function saveBook(book) {
  databaseHandler['books'].push(book);
}

module.exports = Admin;
