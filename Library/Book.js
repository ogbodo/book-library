//The Book object class definition
function Book(title, category, author, date, id) {
  this.id = id;
  this.title = title;
  this.category = category;
  this.author = author;
  this.date = date;
}
module.exports = Book; //Make this class available for external use by importation
