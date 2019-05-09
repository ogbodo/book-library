var User = require('./User');
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
  var users = databaseHandler['users'];

  for (var index = 0; index < users.length; index++) {
    if (users[index].firstName === name || users[index].lastName === name) {
      return users[index];
    }
  }
  return false;
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

module.exports = Admin;
