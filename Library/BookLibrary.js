function BookLibrary(title, category, quantity, author) {
  this.title = title;
  this.category = category;
  this.quantity = quantity;
  this.author = author;
  this.dateAdded = getTodayDate();
}
BookLibrary.prototype.getTitle = function() {
  return this.title;
};
function getTodayDate() {
  return new Date().toLocaleDateString();
}

module.exports = BookLibrary;
