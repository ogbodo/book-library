var User = require('./User');
var Book = require('../Library/Book');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

function Admin(firstName, lastName) {
  User.call(this, firstName, lastName, 'ADMIN');
}
InheritProperty(User, Admin);

Admin.prototype.searchUserByID = function(id) {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === id) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.searchUserByName = function(name) {
  var users = databaseHandler['users'],
    results = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].firstName === name || users[index].lastName === name) {
      results.push(users[index]);
    }
  }
  return results.length === 0 ? false : results;
};

Admin.prototype.deleteUser = function(user) {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === user.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

Admin.prototype.readStudent = function(matricNumber) {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].matricNumber === matricNumber) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.readTeacher = function(staffId) {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].staffId === staffId) {
      return users[index];
    }
  }
  return false;
};

Admin.prototype.addBook = function(title, category, quantity, author) {
  var book = new Book(title, category, quantity, author, getTodayDate());
  databaseHandler['books'].push(book);
  console.log(book);

  return book;
};

function getTodayDate() {
  return new Date().toLocaleDateString();
}

module.exports = Admin;
