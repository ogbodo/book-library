var user = require('./user'); //Import the User object
var inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
var admin = require('./admin'); //Import the Admin object

//Teacher constructor definition
function Teacher(firstName, lastName, staffId, gender, faculty, department) {
  this.staffId = staffId;

  user.call(this, firstName, lastName, gender, 'TEACHER', faculty, department); //To enable proper inheritance
}

//Make Student inherits from User
inheritProperty(user, Teacher);

//This method enables teacher to borrow book
Teacher.prototype.borrowBook = function(bookId) {
  return admin.prototype.lendBook(this, bookId);
};

//This method enables teacher to return borrowed book
Teacher.prototype.returnBorrowedbook = function(bookId) {
  return admin.prototype.returnBook(bookId);
};

module.exports = Teacher; //Make this constructor available for external use by importation
