var User = require('./User'); //Import the User class
var InheritProperty = require('./interface/inheritProperty'); //Import for inhritance
var Admin = require('./Admin'); //Import the Admin class

//Teacher constructor definition
function Teacher(firstName, LastName, staffId, gender, faculty, department) {
  this.staffId = staffId;
  User.call(this, firstName, LastName, gender, 'TEACHER'); //To enable proper inheritance
  this.setFaculty(faculty);
  this.setDepartment(department);
}

//Make Student inherits from User
InheritProperty(User, Teacher);

//This method updates the staff's id
Teacher.prototype.updateStaffId = function(newStaffId) {
  this.staffId = newStaffId;
};

//This method enables teacher to borrow book
Teacher.prototype.borrowBook = function(bookId) {
  return Admin.prototype.lendBook(this, bookId);
};

//This method enables teacher to return borrowed book
Teacher.prototype.returnBorrowedbook = function(bookId) {
  return Admin.prototype.returnBook(bookId);
};

module.exports = Teacher; //Make this class available for external use by importation
