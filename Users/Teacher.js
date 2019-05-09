var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

function Teacher(firstName, LastName, staffId, gender, faculty, department) {
  this.staffId = staffId;
  this.faculty = faculty;
  this.department = department;
  User.call(this, firstName, LastName, gender, 'TEACHER');
}
InheritProperty(User, Teacher);

Teacher.prototype.updateStaffId = function(newStaffId) {
  this.staffId = newStaffId;
};
module.exports = Teacher;
