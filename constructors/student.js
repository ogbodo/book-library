var User = require('./user'); //Import the User object
var InheritProperty = require('./inherit-property'); //Import for this object to enable inheritance
var Admin = require('./admin'); //Import the Admin object

//Student constructor definition
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

  User.call(this, firstName, LastName, gender, 'STUDENT'); //To enable proper inheritance
}

//Make Student inherits from User
InheritProperty(User, Student);

//This method updates student's matric number
Student.prototype.updateMatricNumber = function(newMatricNumber) {
  this.matricNumber = newMatricNumber;
};

//This method updates student's level
Student.prototype.updateLevel = function(level) {
  this.level = level;
};

//This method enables student to borrow book
Student.prototype.borrowBook = function(bookId) {
  return Admin.prototype.lendBook(this, bookId);
};

//This method enables student to return borrowed book
Student.prototype.returnBorrowedbook = function(bookId) {
  return Admin.prototype.returnBook(bookId);
};

module.exports = Student; //Make this constructor available for external use by importation
