var databaseHandler = require('../Library/database/Database');

function User(fullName, userType) {
  this.fullName = fullName;
  this.userType = userType;
  this.id = generateUserId();
  this.save();
  console.log('User saved: ', this);
}
User.prototype.getFullName = function() {
  return this.fullName;
};

User.prototype.update = function(fullName) {
  this.fullName = fullName;
  console.log('Updated FullName: ', this);
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
