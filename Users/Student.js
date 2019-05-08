var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Student(
  firstName,
  LastName,
  matricNumber,
  gender,
  faculty,
  department,
  level
) {
  this.matricNumber = matricNumber;
  this.gender = gender;
  this.faculty = faculty;
  this.department = department;
  this.level = level;
  User.call(this, firstName, LastName, 'STUDENT');
}
InheritProperty(User, Student);
module.exports = Student;
