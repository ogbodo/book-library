var databaseHandler = require('../Library/database/Database');

function User(fullName, userType) {
  this.fullName = fullName;
  this.userType = userType;
  this.id = generateUserId();
  this.save();
}
User.prototype.getFullName = function() {
  return this.fullName;
};

User.prototype.update = function(fullName) {
  this.fullName = fullName;
};

User.prototype.save = function() {
  databaseHandler['users'].push(this);
  console.log('User saved: ', this);
};

function generateUserId() {
  var users = databaseHandler['users'];
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}
module.exports = User;
