var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');
var databaseHandler = require('../Library/database/Database');

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

Student.prototype.updateMatricNumber = function(newMatricNumber) {
  this.matricNumber = newMatricNumber;
};

Student.prototype.updateGender = function(gender) {
  this.gender = gender;
};

module.exports = Student;
