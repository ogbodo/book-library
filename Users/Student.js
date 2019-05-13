var User = require('./User'); //Import the User class
var InheritProperty = require('./interface/inheritProperty'); //Import for inhritance
var Admin = require('./Admin'); //Import the Admin class

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
Student.prototype.returnBorrowedbook = function(title, author) {
  return Admin.prototype.returnBook(this, title, author);
};

module.exports = Student; //Make this class available for external use by importation
