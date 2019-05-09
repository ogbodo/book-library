var User = require('./User');
var Book = require('../Library/Book');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

function Admin(firstName, lastName, gender) {
  User.call(this, firstName, lastName, gender, 'ADMIN');
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

Admin.prototype.deleteAllTeacher = function() {
  return deleteUsers('TEACHER');
};

Admin.prototype.deleteAllStudent = function() {
  return deleteUsers('STUDENT');
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

Admin.prototype.getUsers = function() {
  return databaseHandler['users'];
};

Admin.prototype.getAllTeachers = function() {
  return getUserSets('TEACHER');
};

Admin.prototype.getAllStudents = function() {
  return getUserSets('STUDENT');
};

Admin.prototype.getAllAdmins = function() {
  return getUserSets('ADMIN');
};

Admin.prototype.addBook = function(title, category, author) {
  return Book.prototype.create(title, category, author);
};

Admin.prototype.getBooksByTitle = function(title) {
  return Book.prototype.getByTitle(title);
};

Admin.prototype.getBooksByAuthor = function(author) {
  return Book.prototype.getByAuthor(author);
};

Admin.prototype.getBooksByDate = function(date) {
  return Book.prototype.getByDate(date);
};

Admin.prototype.getAllBooks = function() {
  return Book.prototype.getBooks();
};

Admin.prototype.updateBookTitle = function(book, newTitle) {
  return Book.prototype.updateTitle(book, newTitle);
};

Admin.prototype.deleteBook = function(book) {
  return Book.prototype.delete(book);
};

Admin.prototype.deleteBooks = function() {
  return Book.prototype.deleteAll();
};

function getUserSets(userType) {
  var users = Admin.prototype.getUsers(),
    usersFound = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].userType == userType) {
      usersFound.push(users[index]);
    }
  }
  return usersFound.length === 0 ? false : usersFound;
}

function deleteUsers(userType) {
  var users = Admin.prototype.getUsers(),
    madeDeletion = false;
  for (var index = 0; index < users.length; index++) {
    if (users[index].userType === userType) {
      users.splice(index, 1);
      madeDeletion = true;
    }
  }
  return madeDeletion;
}

module.exports = Admin;
