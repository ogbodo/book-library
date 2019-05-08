var BookLibrary = require('./BookLibrary');

test('Teacher can be created', function() {
  var bookLibrary = new BookLibrary(
    'What Men Want',
    'Journal',
    200,
    'Izuking Ogbodo'
  );
  expect(bookLibrary.getTitle()).toBe('What Men Want');
});
