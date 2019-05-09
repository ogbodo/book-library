var databaseHandler = require('../Library/database/Database');

function User(firstName, lastName, userType) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.userType = userType;
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

function generateUserId() {
  var users = getUsers();
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}

User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

function getUsers() {
  return databaseHandler['users'];
}
module.exports = User;
