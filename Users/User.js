var databaseHandler = require('../Library/database/Database');

function User(firstName, lastName, userType) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.userType = userType;
  this.id = generateUserId();
  this.save();
  console.log('User saved: ', this);
}

User.prototype.getFirstName = function() {
  return this.firstName;
};

User.prototype.getLastName = function() {
  return this.lastName;
};

User.prototype.updateFirstName = function(name) {
  this.firstName = name;
  console.log('Updated FirstName: ', this);
};

User.prototype.updateLastName = function(name) {
  this.lastName = name;
  console.log('Updated LastName: ', this);
};

User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

User.prototype.deleteAccount = function() {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

User.prototype.retrieveDetails = function() {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      return users[index];
    }
  }
};

function generateUserId() {
  var users = databaseHandler['users'];
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}
module.exports = User;
