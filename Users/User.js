var databaseHandler = require('../Library/database/Database');

function User(firstName, lastName, gender, userType) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.userType = userType;
  this.borrowedBooks = 0;
  this.id = generateUserId();
  this.save();
}

User.prototype.getFirstName = function() {
  return this.firstName;
};

User.prototype.getLastName = function() {
  return this.lastName;
};

User.prototype.updateFirstName = function(name) {
  this.firstName = name;
};

User.prototype.updateLastName = function(name) {
  this.lastName = name;
};

User.prototype.deleteAccount = function() {
  var users = getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

User.prototype.retrieveDetails = function() {
  var users = getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      return users[index];
    }
  }
};

User.prototype.setFaculty = function(faculty) {
  this.faculty = faculty;
};

User.prototype.setDepartment = function(department) {
  this.department = department;
};

User.prototype.updateGender = function(gender) {
  this.gender = gender;
};

User.prototype.updateFaculty = function(faculty) {
  this.faculty = faculty;
};

User.prototype.updateDepartment = function(department) {
  this.department = department;
};

function generateUserId() {
  var users = getUsers();
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}

User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

// User.prototype.borrowBook = function(book) {
//   this.borrowedBooks.push(book);
//   return this.borrowedBooks;
// };

function getUsers() {
  return databaseHandler['users'];
}
module.exports = User;
