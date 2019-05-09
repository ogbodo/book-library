var User = require('./User');
var InheritProperty = require('./Interface/InheritProperty');

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

module.exports = Teacher;
