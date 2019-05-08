var BookLibrary = require('./BookLibrary');

describe('Adding new book into the library', function() {
  var bookLibrary;
  test('Books can be created', function() {
    bookLibrary = new BookLibrary(
      'What Men Want',
      'Journal',
      200,
      'Izuking Ogbodo'
    );
    expect(bookLibrary.saveBook()).toBeTruthy();
  });
});
