var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');
var Admin = require('./Admin');

function Teacher(firstName, LastName, staffId, gender, faculty, department) {
  this.staffId = staffId;
  User.call(this, firstName, LastName, gender, 'TEACHER');
  this.setFaculty(faculty);
  this.setDepartment(department);
}
InheritProperty(User, Teacher);

Teacher.prototype.updateStaffId = function(newStaffId) {
  this.staffId = newStaffId;
};

Teacher.prototype.borrowBook = function(title, author) {
  return Admin.prototype.lendBook(this, title, author);
};
Teacher.prototype.returnBorrowedbook = function(title, author) {
  return Admin.prototype.returnBook(this, title, author);
};

module.exports = Teacher;
