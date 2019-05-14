var databaseHandler = require('./database/Database'); //Import the database
var Book = require('./Book'); //Import the Book class
var generateId = require('../users/interface/helpers'); //Import the database

function BookLibrary() {} //Empty constructor just enable us implement its prototypes

//This method enables us to add new Book object into the book library
BookLibrary.prototype.create = function(title, category, author) {
  var book = new Book(
    title,
    category,
    author,
    new Date().toLocaleDateString(), //gets and format today date
    generateId(databaseHandler['books']) //returns a new Id for this book
  );
  this.save(book); //save this book in database
  this.addBookToCatalog(book.id, book.date, book.title, book.author); //record this new book in the catalog
  return book; //return the new book
};

//This method gets the book
BookLibrary.prototype.get = function(bookId) {
  var books = this.getBooks(); //Gets all books from database
  for (var index = 0; index < books.length; index++) {
    if (books[index].id === bookId) {
      return books[index];
    }
  }
};

//This method gets all books
BookLibrary.prototype.getBooks = function() {
  return databaseHandler['books'];
};

//This method updates book title
BookLibrary.prototype.updateTitle = function(book, newTitle) {
  var books = this.getBooks(); //Gets all books from database
  for (var index = 0; index < books.length; index++) {
    if (books[index].id === book.id) {
      books[index].title = newTitle; //Performs the update here
      return books[index]; //Returns the updated book.
    }
  }
};

//This method deletes book from the library
BookLibrary.prototype.delete = function(bookId) {
  var books = this.getBooks(); //Gets all books from database
  for (var index = 0; index < books.length; index++) {
    if (books[index].id === bookId) {
      books.splice(index, 1); //Using the splice method of Javascript to remove one book at a particular position(i.e at a particular index) of the books collection.
      return true; //returns true as a response
    }
  }
  return 'Book Not Found'; //returns false as a response if book with such ID does not exist
};

//This method deletes all books
BookLibrary.prototype.deleteAll = function(book) {
  var books = this.getBooks(); //Gets all books from database
  books.splice(0, books.length); //Using the splice method of Javascript to remove books from start to end(i.e from index 0 to last index) of the books collection.
  return books.length; //Returns the new length of the collection of books (which obviously will be 0 at this point)
};

//This method add books to catalog
BookLibrary.prototype.addBookToCatalog = function(bookId, dateAdded, title) {
  //build the catalog for the current object and save it in the catalog collection
  var catalogRecord = {
    id: generateId(databaseHandler['catalog']), //Generates a new Id for this book
    bookTitle: title,
    bookId: bookId,
    dateAdded: dateAdded
  };

  databaseHandler['catalog'].push(catalogRecord);
};

//This method takes record of book borrowed by users
BookLibrary.prototype.recordBookRelease = function(bookId) {
  return this.removeBookFromCatalog(bookId); //Gets the particular catalog record based on the Id of the book
};

//This method takes record of book returned by users
BookLibrary.prototype.recordBookReturned = function(bookId) {
  var bookCatalog = this.removeBookFromCatalog(bookId); //Gets the particular catalog record based on the Id of the book

  return (bookCatalog.copies += 1); //increment number of copies by one and return
};

//Returns all the cataloged book
BookLibrary.prototype.removeBookFromCatalog = function(bookId) {
  var catalogs = databaseHandler['catalog'];

  for (let index = 0; index < catalogs.length; index++) {
    if (catalogs[index].bookId == bookId) {
      catalogs.splice(index, 1); //This line removes one book from the catalog.
      return true;
    }
  }

  return false;
};

//private function that saves book
BookLibrary.prototype.save = function(book) {
  databaseHandler['books'].push(book); //Gets all the book from the book database
};

module.exports = BookLibrary; //Make this constructor available for external use by importation
