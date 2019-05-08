var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Admin(fullName) {
  User.call(this, fullName, 'ADMIN');
}
InheritProperty(User, Admin);

Admin.prototype.updateFullName = function(fullName) {
  this.update(fullName);
};
module.exports = Admin;
