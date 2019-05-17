var user = require('./user'); //Import the User Object
var bookLibrary = require('./book-library'); //Import the book library
var inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
var databaseHandler = require('../database/database'); //Import the database
var generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Admin constructor definition
function Admin(firstName, lastName, gender) {
  user.call(this, firstName, lastName, gender, 'ADMIN'); //To enable proper inheritance
}

//Make Admin inherits from User
inheritProperty(user, Admin);

//Get a user by id
Admin.prototype.getUserByID = function(id) {
  var users = this.getUsers(); //Returns the collection of Users

  for (var index = 0; index < users.length; index++) {
    //Compare each user id with the user id we are interested in and return it.
    if (users[index].id === id) return users[index];
  }

  return false; //Returns false if no user with such id exists
};

//Get all users with same either first-name or last-name
Admin.prototype.searchUserByName = function(name) {
  var users = this.getUsers(), //Returns the collection of Users
    results = [];
  for (var index = 0; index < users.length; index++) {
    //Compare each user id with the user id we are interested in.
    if (users[index].firstName === name || users[index].lastName === name) {
      results.push(users[index]); //Adds this found user in our result collection
    }
  }
  return results.length === 0 ? false : results; //Returns false if no result found else returns true
};

//This method deletes a user
Admin.prototype.deleteUser = function(userId) {
  var users = this.getUsers(); //Returns the collection of Users

  for (var index = 0; index < users.length; index++) {
    //We wont use the identity equality(===) here to allow type coercion by the javascript engine
    if (users[index].id === userId) {
      users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.
      return true; //returns true as a response
    }
  }
  return 'User Not Found'; //returns user not found if user with such ID does not exist
};

//This method deletes all teachers
Admin.prototype.deleteAllTeachers = function() {
  return this.deleteUsers('TEACHER');
};

//This method deletes all students
Admin.prototype.deleteAllStudents = function() {
  return this.deleteUsers('STUDENT');
};

//This method reads a student
Admin.prototype.readStudent = function(matricNumber) {
  var users = this.getUsers(); //Returns the collection of Users
  for (var index = 0; index < users.length; index++) {
    //Compare each matric number with the student matric number we are interested in.
    if (users[index].matricNumber === matricNumber) {
      return users[index]; //Return the student.
    }
  }
  return false; //Return false if no student with such matric number found.
};

//This method reads a teacher
Admin.prototype.readTeacher = function(staffId) {
  var users = this.getUsers(); //Returns the collection of Users
  for (var index = 0; index < users.length; index++) {
    //Compare each staff-Id with the staff Id we are interested in.
    if (users[index].staffId === staffId) {
      return users[index]; //Return the staff
    }
  }
  return false; //Return false if no staff with such staff-Id found.
};

//This method returns all users
Admin.prototype.getUsers = function() {
  return databaseHandler['users'];
};

//This method returns all teachers
Admin.prototype.getAllTeachers = function() {
  return this.getUserSets('TEACHER');
};

//This method returns all students
Admin.prototype.getAllStudents = function() {
  return this.getUserSets('STUDENT');
};

//This method returns all admins
Admin.prototype.getAllAdmins = function() {
  return this.getUserSets('ADMIN');
};

//This method adds book to the library
Admin.prototype.addBook = function(title, category, author) {
  return bookLibrary.prototype.create(title, category, author);
};

//This method gets all  books
Admin.prototype.getAllBooks = function() {
  return bookLibrary.prototype.getBooks();
};

//This method updates book by title
Admin.prototype.updateBookTitle = function(book, newTitle) {
  return bookLibrary.prototype.updateTitle(book, newTitle);
};

//This method deletes a book
Admin.prototype.deleteBook = function(book) {
  return bookLibrary.prototype.delete(book);
};

//This method deletes all books
Admin.prototype.deleteBooks = function() {
  return bookLibrary.prototype.deleteAll();
};

//Method that returns the maximum value between two numbers
Admin.prototype.getMaximumValue = function(firstPerson, secondPerson) {
  //Compares to see which person's level is greater
  if (firstPerson.level >= secondPerson.level) {
    return firstPerson;
  }

  return secondPerson;
};

//Method that returns the user who should be considered
Admin.prototype.getThePerson = function(firstPerson, secondPerson) {
  if (firstPerson.userType === 'TEACHER') {
    return firstPerson;
  }
  if (secondPerson.userType === 'TEACHER') {
    return secondPerson;
  }

  return this.getMaximumValue(firstPerson, secondPerson); //Compare between the two student who is the senior
};

//Returns the person whose priority to be considered is high
Admin.prototype.prioritizeCollector = function(users) {
  var rightPerson = users[0]; //Gets the first person from the array

  for (let index = 1; index < users.length; index++) {
    //Returns the right person to be consider
    rightPerson = this.getThePerson(rightPerson, users[index]);
  }

  return rightPerson; //Returns the person considered
};

//This method implements the algorithm for borrowing out book
Admin.prototype.lendBook = function(user, bookId) {
  //First checks if number of users requesting for the book is more than one by determining if user object is an array of user objects or not.
  //var user;
  if (user.constructor === Array) {
    user = this.prioritizeCollector(user); //Determine who to be considered first
  }

  var isAvailable = this.recordLendActivity(bookId); //Determine if the book is still available for borrow or not

  if (!isAvailable) {
    return 'Book Taken'; //At this point, the book is unavailable
  }

  var book = bookLibrary.prototype.get(bookId); //At this stage, we are sure that the book is till available, so just go ahead and returns the particular book

  // Just go ahead to complete the demand
  return this.completeBorrowProcess(book, user);
};

//Records the borrowing activity
Admin.prototype.recordLendActivity = function(bookId) {
  return bookLibrary.prototype.recordBookRelease(bookId);
};

//Records the return activity
Admin.prototype.recordReturnActivity = function(bookId) {
  return bookLibrary.prototype.recordBookReturned(bookId);
};

//This method implements the algorithm for returning a book
Admin.prototype.returnBook = function(bookId) {
  var allBorrowedBooks = databaseHandler['collectors']; //Retrieves the list of all books borrowed thus far.

  var itsRemoved = false; //Initialize to false

  for (let index = 0; index < allBorrowedBooks.length; index++) {
    //Compare each book-Ids with the book id we are interested in.
    if (allBorrowedBooks[index].bookId === bookId) {
      this.recordReturnActivity(bookId); //Acknowledge the return of this book
      allBorrowedBooks.splice(index, 1); //Remove this book from the list of all books borrowed thus far
      itsRemoved = true; //Sets to true
      break;
    }
  }

  return itsRemoved; //Return operation status
};

//This method retrieves users based on their user type: Teachers, Students or Admins
Admin.prototype.getUserSets = function(userType) {
  var users = Admin.prototype.getUsers(), //Returns the collection of Users
    usersFound = []; //Declare an empty collection
  for (var index = 0; index < users.length; index++) {
    //Compare each user-type with the user type we are interested in.
    if (users[index].userType === userType) {
      usersFound.push(users[index]); //Add this user to usersFound collection declared above
    }
  }

  return usersFound; //Returns the collection of found users
};

//This method deletes users based on their user type: Teachers, Students or Admins
Admin.prototype.deleteUsers = function(userType) {
  var users = Admin.prototype.getUsers(), //Returns the collection of Users
    madeDeletion = false;

  for (var index = 0; index < users.length; index++) {
    //Compare each user-type with the user type we are interested in.
    if (users[index].userType === userType) {
      users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the User collection.
      madeDeletion = true; // sets true as a response
    }
  }

  return madeDeletion; //Returns the response
};

//This method completes the borrow process
Admin.prototype.completeBorrowProcess = function(book, user) {
  var allBorrowedBooks = databaseHandler['collectors']; //Returns the collection of collectors
  var dateIssued = new Date().toLocaleDateString(); //Gets and format today date
  var id = generateId(allBorrowedBooks); //Generates a new Id for this borrowed book

  //Object literal with both user and book information
  var borrowedBook = {
    id: id,
    bookTitle: book.title,
    author: book.author,
    bookId: book.id,
    dateIssued: dateIssued,
    userId: user.id
  };

  allBorrowedBooks.push(borrowedBook); //Adds the borrowedBook object to the collection of books borrowed

  return borrowedBook; //returns the borrowed book
};

module.exports = Admin; //Make this constrictor available for external use by importation
