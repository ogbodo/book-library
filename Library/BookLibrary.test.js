var BookLibrary = require('./BookLibrary');

test('Books can be created', function() {
  var bookLibrary = new BookLibrary(
    'What Men Want',
    'Journal',
    200,
    'Izuking Ogbodo'
  );
  expect(bookLibrary.getTitle()).toBe('What Men Want');
});
