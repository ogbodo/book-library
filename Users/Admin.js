var User = require('./User'); //Import the User class
var BookLibrary = require('../Library/BookLibrary'); //Import the book library
var InheritProperty = require('./Interface/InheritProperty'); //Import for inhritance
var databaseHandler = require('../Library/database/Database'); //Import the database

//Admin constructor definition
function Admin(firstName, lastName, gender) {
  User.call(this, firstName, lastName, gender, 'ADMIN'); //To enable proper inheritance
}

//Make Admin inherits from User
InheritProperty(User, Admin);

//Get a user by id
Admin.prototype.searchUserByID = function(id) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === id) {
      return users[index];
    }
  }
  return false;
};

//Get a user by name
Admin.prototype.searchUserByName = function(name) {
  var users = this.getUsers(),
    results = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].firstName === name || users[index].lastName === name) {
      results.push(users[index]);
    }
  }
  return results.length === 0 ? false : results; //Returns false if no result found else returns true
};

//This method deletes a user
Admin.prototype.deleteUser = function(user) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === user.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

//This method deletes all teachers
Admin.prototype.deleteAllTeacher = function() {
  return deleteUsers('TEACHER');
};

//This method deletes all students
Admin.prototype.deleteAllStudent = function() {
  return deleteUsers('STUDENT');
};

//This method reads a student
Admin.prototype.readStudent = function(matricNumber) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].matricNumber === matricNumber) {
      return users[index];
    }
  }
  return false;
};

//This method reads a teacher
Admin.prototype.readTeacher = function(staffId) {
  var users = this.getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].staffId === staffId) {
      return users[index];
    }
  }
  return false;
};

//This method returns all users
Admin.prototype.getUsers = function() {
  return databaseHandler['users'];
};

//This method returns all teachers
Admin.prototype.getAllTeachers = function() {
  return getUserSets('TEACHER');
};

//This method returns all students
Admin.prototype.getAllStudents = function() {
  return getUserSets('STUDENT');
};

//This method returns all admins
Admin.prototype.getAllAdmins = function() {
  return getUserSets('ADMIN');
};

//This method adds book to add new boks
Admin.prototype.addBook = function(title, category, author) {
  return BookLibrary.prototype.create(title, category, author);
};

//This method gets book by title
Admin.prototype.getBooksByTitle = function(title) {
  return BookLibrary.prototype.getByTitle(title);
};

//This method gets book by author
Admin.prototype.getBooksByAuthor = function(author) {
  return BookLibrary.prototype.getByAuthor(author);
};

//This method gets book by date
Admin.prototype.getBooksByDate = function(date) {
  return BookLibrary.prototype.getByDate(date);
};
//This method gets all  books
Admin.prototype.getAllBooks = function() {
  return BookLibrary.prototype.getBooks();
};

//This method updates book by title
Admin.prototype.updateBookTitle = function(book, newTitle) {
  return BookLibrary.prototype.updateTitle(book, newTitle);
};

//This method deletes a book
Admin.prototype.deleteBook = function(book) {
  return BookLibrary.prototype.delete(book);
};

//This method deletes all books
Admin.prototype.deleteBooks = function() {
  return BookLibrary.prototype.deleteAll();
};

//Private function that returns the maximum value between two numbers
function getMaximumValue(firstPerson, secondPerson) {
  if (firstPerson.level >= secondPerson.level) {
    return firstPerson;
  }

  return secondPerson;
}

//Private function that returns the user who should be considered
function getThePerson(firstPerson, secondPerson) {
  if (firstPerson.userType === 'TEACHER') {
    return firstPerson;
  }
  if (secondPerson.userType === 'TEACHER') {
    return secondPerson;
  }

  return getMaximumValue(firstPerson, secondPerson); //Compare between the two student who is the senior
}

//Returns the person whose priority to be considered is high
Admin.prototype.prioritizeCollector = function(users) {
  var rightPerson = users[0]; //Gets the first person from the array

  for (let index = 1; index < users.length; index++) {
    rightPerson = getThePerson(rightPerson, users[index]);
  }

  return rightPerson; //Returns the person considered
};

//This method implements the algorithm for borrowing out book
Admin.prototype.lendBook = function(user, title, author) {
  //First checks if number of users requesting for the book is more than one by determining if user object is an array of user objects or not.
  if (user.constructor === Array) {
    user = this.prioritizeCollector(user); //Determine who to be considered first
  }

  var isAvailable = this.recordLendActivity(title, author); //Determine if the book is still available for borrow or not

  if (!isAvailable) {
    return 'Book Taken'; //At this point, the book is unavailable
  }
  var book = BookLibrary.prototype.get(title, author); //Returns the particular book

  //Checks if the book was found or not
  if (book === 'Not Found') {
    return book;
  }

  //At this point the book was actually found
  var collectors = databaseHandler['collectors']; //Gets all  users who had borrowed books before now

  var currentUserCollections = collectors[user.id]; //Retrieves the list of the books borroew by this current user object by using its id

  //Checks If this user had borrowed book before now
  if (!currentUserCollections) {
    currentUserCollections = []; //Initialize an empty array

    return completeBorrowProcess(
      book,
      user,
      currentUserCollections,
      collectors
    );
  }

  //At this point, user had borrowed book before now. So, just go ahead to complete the process
  return completeBorrowProcess(book, user, currentUserCollections, collectors);
};

//Records the borrowing activity
Admin.prototype.recordLendActivity = function(title, author) {
  return BookLibrary.prototype.recordBookRelease(title, author);
};

//Records the return activity
Admin.prototype.recordReturnActivity = function(title, author) {
  return BookLibrary.prototype.recordBookReturned(title, author);
};

//This method implements the algorithm for returning a book
Admin.prototype.returnBook = function(user, title, author) {
  var currentUserCollections = databaseHandler['collectors'][user.id]; //retrievs the list of books borrowed by this user

  var itsRemoved = false;

  for (let index = 0; index < currentUserCollections.length; index++) {
    if (
      currentUserCollections[index].bookTitle === title &&
      currentUserCollections[index].author === author
    ) {
      this.recordReturnActivity(title, author); //Aknowledge the return of this book
      currentUserCollections.splice(index, 1); //Remove this book from list of books this user has borrowed
      itsRemoved = true;
      break;
    }
  }

  return itsRemoved;
};

//This function retrievs users based on their user type: Teachers, Students or Admins
function getUserSets(userType) {
  var users = Admin.prototype.getUsers(),
    usersFound = [];
  for (var index = 0; index < users.length; index++) {
    if (users[index].userType == userType) {
      usersFound.push(users[index]);
    }
  }

  return usersFound;
}

//This function deletes users based on their user type: Teachers, Students or Admins
function deleteUsers(userType) {
  var users = Admin.prototype.getUsers(),
    madeDeletion = false;

  for (var index = 0; index < users.length; index++) {
    if (users[index].userType === userType) {
      users.splice(index, 1);
      madeDeletion = true;
    }
  }

  return madeDeletion;
}

//This function completes the borrow process
function completeBorrowProcess(
  book,
  user,
  userBorrowedBooks,
  allBorrowedBooks
) {
  var dateIssued = new Date().toLocaleDateString();

  //Object literal with both user and book information
  var borrowedBook = {
    bookTitle: book.title,
    author: book.author,
    bookId: book.id,
    dateIssued: dateIssued,
    userId: user.id
  };

  userBorrowedBooks.push(borrowedBook); //Adds the borrowedBook object to the current user's collections of books borrowed

  allBorrowedBooks[user.id] = userBorrowedBooks; //Assigning the collections to the user's id

  return borrowedBook; //returns the borrowed book
}

module.exports = Admin; //Make this class available for external use by importation
