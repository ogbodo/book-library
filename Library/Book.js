function Book(title, category, quantity, author, date) {
  this.title = title;
  this.category = category;
  this.quantity = quantity;
  this.author = author;
  this.date = date;
}
Book.prototype.getTitle = function() {
  console.log(this.title);

  return this.title;
};
module.exports = Book;
