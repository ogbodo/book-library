var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Teacher(fullName) {
  User.call(this, fullName, 'TEACHER');
}
InheritProperty(User, Teacher);
module.exports = Teacher;
