function Book(title, category, quantity, author, date) {
  this.title = title;
  this.category = category;
  this.quantity = quantity;
  this.author = author;
  this.date = date;
}
Book.prototype.getTitle = function() {
  return this.title;
};
Book.prototype.getCategory = function() {
  return this.category;
};
Book.prototype.getQuantity = function() {
  return this.quantity;
};
Book.prototype.getAuthor = function() {
  return this.author;
};
Book.prototype.getDate = function() {
  return this.date;
};

Book.prototype.setTitle = function(title) {
  this.title = title;
};
Book.prototype.setCategory = function(category) {
  this.category = category;
};
Book.prototype.setQuantity = function(quantity) {
  this.quantity = quantity;
};
Book.prototype.setAuthor = function(author) {
  this.author = author;
};
Book.prototype.setDate = function(date) {
  this.date = date;
};

module.exports = Book;
