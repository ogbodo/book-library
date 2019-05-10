var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');
const Admin = require('./Admin');

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
  this.faculty = faculty;
  this.department = department;
  this.level = level;
  User.call(this, firstName, LastName, gender, 'STUDENT');
}
InheritProperty(User, Student);

Student.prototype.updateMatricNumber = function(newMatricNumber) {
  this.matricNumber = newMatricNumber;
};

Student.prototype.updateLevel = function(level) {
  this.level = level;
};

User.prototype.borrowBook = function(title, author) {
  return Admin.prototype.lendBook(this, title, author);
};

module.exports = Student;
