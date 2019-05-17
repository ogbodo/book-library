var databaseHandler = require('../database/database'); //Import the database
var book = require('../constructors/book'); //Import the Book object
var generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.
function BookLibrary() {} //Empty constructor just to enable us implement its prototypes

//This method enables us to add new Book object into the book library
BookLibrary.prototype.create = function(title, category, author) {
  var newBook = new book(
    title,
    category,
    author,
    new Date().toLocaleDateString(), //Gets and format today date
    generateId(databaseHandler['books']) //Generates a new Id for this book
  );

  this.save(newBook); //Save this book in the book database

  this.addBookToCatalog(
    newBook.id,
    newBook.date,
    newBook.title,
    newBook.author
  ); //Record this new book in the catalog

  return newBook; //return the new book
};

//This method gets a book
BookLibrary.prototype.get = function(bookId) {
  var books = this.getBooks(); //Returns the collection of books

  for (var index = 0; index < books.length; index++) {
    //Compare each book id with the book id we are interested in.
    if (books[index].id === bookId) {
      //Returns the acutal book object we are interested in.
      return books[index];
    }
  }
};

//This method returns all books
BookLibrary.prototype.getBooks = function() {
  return databaseHandler['books']; //Gets the collection of books from the database.
};

//This method updates book title
BookLibrary.prototype.updateTitle = function(book, newTitle) {
  var books = this.getBooks(); //Returns the collection of books

  for (var index = 0; index < books.length; index++) {
    //Compare each book id with the book id we are interested in.
    if (books[index].id === book.id) {
      books[index].title = newTitle; //Performs the update here
      return books[index]; //Returns the updated book.
    }
  }
};

//This method deletes book from the library
BookLibrary.prototype.delete = function(bookId) {
  var books = this.getBooks(); //Returns the collection of books

  for (var index = 0; index < books.length; index++) {
    //Compare each book id with the book id we are interested in.
    if (books[index].id === bookId) {
      books.splice(index, 1); //Using the splice method of Javascript to remove one book at a particular position(i.e at a particular index) of the books collection.
      return true; //returns true as a response
    }
  }
  return 'Book Not Found'; //returns false as a response if book with such ID does not exist
};

//This method deletes all books
BookLibrary.prototype.deleteAll = function() {
  var books = this.getBooks(); //Returns the collection of books
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

  databaseHandler['catalog'].push(catalogRecord); //Adds this newly created catalog record into the catalog collection
};

//This method takes record of book borrowed by users
BookLibrary.prototype.recordBookRelease = function(bookId) {
  return this.removeBookFromCatalog(bookId); //Gets the particular catalog record of a book
};

//This method makes record of book returned by users
BookLibrary.prototype.recordBookReturned = function(bookId) {
  return this.removeBookFromCatalog(bookId); //Removes the particular book from the catalog collection
};

//Removes book from catalog
BookLibrary.prototype.removeBookFromCatalog = function(bookId) {
  var catalogs = databaseHandler['catalog']; //Retrieves catalog collection from the database

  for (let index = 0; index < catalogs.length; index++) {
    //Compare each book id with the book id we are interested in.
    if (catalogs[index].bookId == bookId) {
      catalogs.splice(index, 1); //This line removes one book from the catalog.
      return true; //Returns true for successful operation
    }
  }

  return false; //Returns false for unsuccessful operation
};

//Method that saves book
BookLibrary.prototype.save = function(book) {
  databaseHandler['books'].push(book); //Returns all the book from the book database
};

module.exports = BookLibrary; //Make this constructor available for external use by importation
