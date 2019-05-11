var databaseHandler = require('./database/Database'); //Import the database
var Book = require('./Book'); //Import the Book class

function BookLibrary() {} //Empty constructor function just enable us implement its prototypes

//This method enables us to add new Book object into the book library
BookLibrary.prototype.create = function(title, category, author) {
  var book = new Book(
    title,
    category,
    author,
    new Date().toLocaleDateString(), //gets and formate today date
    generateId() //returns a new Id for this book
  );
  save(book); //save this book in database
  this.addBookToCatalog(book.id, book.date, book.title, book.author); //record this new book in the catalog
  return book; //return the new book
};

//This method gets a book by title and author
BookLibrary.prototype.get = function(title, author) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].title === title && books[index].author === author) {
      return books[index];
    }
  }
  return 'Not Found';
};

//This method gets a book by title
BookLibrary.prototype.getByTitle = function(title) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].title === title) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound; //returns false if no book found else rreturns true
};

//This method gets a book by author
BookLibrary.prototype.getByAuthor = function(author) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].author === author) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound; //returns false if no book found else rreturns true
};

//This method gets a book by date added into the library
BookLibrary.prototype.getByDate = function(date) {
  var books = this.getBooks(),
    booksFound = [];
  for (var index = 0; index < books.length; index++) {
    if (books[index].date === date) {
      booksFound.push(books[index]);
    }
  }
  return booksFound.length === 0 ? false : booksFound; //returns false if no book found else rreturns true
};

//This method gets all books
BookLibrary.prototype.getBooks = function() {
  return databaseHandler['books'];
};

//This method updates book title
BookLibrary.prototype.updateTitle = function(book, newTitle) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].id == book.id) {
      books[index].title = newTitle;
      return books[index];
    }
  }
};

//This method deletes book from the library
BookLibrary.prototype.delete = function(book) {
  var books = this.getBooks();
  for (var index = 0; index < books.length; index++) {
    if (books[index].id === book.id) {
      books.splice(index, 1);
      return true;
    }
  }
};

//This method deletes all books
BookLibrary.prototype.deleteAll = function(book) {
  var books = this.getBooks();
  books.splice(0, books.length);
  return books.length;
};

//This method add books to catalog
BookLibrary.prototype.addBookToCatalog = function(
  bookId,
  dateAdded,
  title,
  author
) {
  var bookCatalog = this.getCatalog(title, author);
  var copies = 0;

  //If this book is not yet cataloged
  if (!bookCatalog) {
    copies++;
    //build the catalog for the current object and save it in the catalog
    databaseHandler['catalog'][title + ' by ' + author] = {
      bookTitle: title,
      bookId: bookId,
      dateAdded: dateAdded,
      copies: copies
    };

    return databaseHandler['catalog'][title + ' by ' + author];
  }
  bookCatalog.copies += 1; //Just increment number of copies of this book since its already in the catalog
};

//This method taakes record of book borrowed by users
BookLibrary.prototype.recordBookRelease = function(title, author) {
  var bookCatalog = this.getCatalog(title, author);
  if (!bookCatalog) {
    return 'Book Not Found';
  }
  var isAvailable = bookCatalog.copies > 0 ? true : false; //returns false if no book found else rreturns true

  if (isAvailable) {
    //If the book is available, decrement number of copies by one
    bookCatalog.copies -= 1;
  }

  return isAvailable; //return the record status: either true or false
};

//This method taakes record of book returned by users
BookLibrary.prototype.recordBookReturned = function(title, author) {
  var bookCatalog = this.getCatalog(title, author);

  return (bookCatalog.copies += 1); //increment number of copies by one and return
};

//Returns all the cataloged book
BookLibrary.prototype.getCatalog = function(title, author) {
  return databaseHandler['catalog'][title + ' by ' + author];
};

//private function that saves book
function save(book) {
  databaseHandler['books'].push(book);
}

//private function that saves generates book id
function generateId() {
  var books = databaseHandler['books'];
  return books.length > 0 ? books[books.length - 1].id + 1 : 1;
}

module.exports = BookLibrary; //Make this class available for external use by importation
