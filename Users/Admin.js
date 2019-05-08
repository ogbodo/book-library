var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');
function Admin(fullName) {
  User.call(this, fullName, 'Admin');
}
InheritProperty(User, Admin);
module.exports = Admin;
