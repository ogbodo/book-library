var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Student(fullName) {
  User.call(this, fullName, 'STUDENT');
}
InheritProperty(User, Student);
module.exports = Student;
