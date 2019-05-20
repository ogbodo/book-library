//The Book object constructor definition
function Book(title, category, author, date, id) {
  this.id = id;
  this.title = title;
  this.category = category;
  this.author = author;
  this.date = date;
}
module.exports = Book; //Make this constructor available for external use by importation
