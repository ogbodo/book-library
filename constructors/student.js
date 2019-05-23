var user = require('./user'); //Import the User object
var inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
var admin = require('./admin'); //Import the Admin object

//Student constructor definition
function Student(
  firstName,
  lastName,
  matricNumber,
  gender,
  faculty,
  department,
  level
) {
  this.matricNumber = matricNumber;
  this.level = level;

  user.call(this, firstName, lastName, gender, 'STUDENT', faculty, department); //To enable proper inheritance
}

//Make Student inherits from User
inheritProperty(user, Student);

//This method updates student's level
Student.prototype.updateLevel = function(level) {
  this.level = level;
};

//This method enables student to borrow book
Student.prototype.borrowBook = function(bookId) {
  return admin.prototype.lendBook(this, bookId);
};

//This method enables student to return borrowed book
Student.prototype.returnBorrowedbook = function(bookId) {
  return admin.prototype.returnBook(bookId);
};

module.exports = Student; //Make this constructor available for external use by importation
