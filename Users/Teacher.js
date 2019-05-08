var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Teacher(firstName, LastName, staffId, gender, faculty, department) {
  this.staffId = staffId;
  this.gender = gender;
  this.faculty = faculty;
  this.department = department;
  User.call(this, firstName, LastName, 'TEACHER');
}
InheritProperty(User, Teacher);
module.exports = Teacher;
