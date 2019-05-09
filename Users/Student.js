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

Student.prototype.updateMatricNumber = function(newMatricNumber) {
  this.matricNumber = newMatricNumber;
};

Student.prototype.updateGender = function(gender) {
  this.gender = gender;
};

Student.prototype.updateFaculty = function(faculty) {
  this.faculty = faculty;
};

Student.prototype.updateDepartment = function(department) {
  this.department = department;
};

Student.prototype.updateLevel = function(level) {
  this.level = level;
};

module.exports = Student;
