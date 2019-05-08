var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

function Admin(fullName) {
  User.call(this, fullName, 'ADMIN');
}
InheritProperty(User, Admin);

Admin.prototype.updateFullName = function(fullName) {
  this.update(fullName);
};

Admin.prototype.searchUserByID = function(id) {
  var users = databaseHandler['users'];
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === id) {
      return users[index];
    }
  }
};

module.exports = Admin;
