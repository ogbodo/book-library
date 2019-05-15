var databaseHandler = require('../database/database'); //Import the database
var generateId = require('../constructors/helpers'); //Import the database

//User constructor definition
function User(firstName, lastName, gender, userType) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.userType = userType;
  this.id = generateId(this.getUsers()); //Generates a new Id for this book

  this.save(); //Save this user to the user database
}

//Gets user's first-name
User.prototype.getFirstName = function() {
  return this.firstName;
};

//Gets user's last-name
User.prototype.getLastName = function() {
  return this.lastName;
};

//Updates user's first-name
User.prototype.updatePersonalDetails = function(firsName, lastName) {
  this.firstName = firsName;
  this.lastName = lastName;
};

//Enables user to delete own account
User.prototype.deleteAccount = function() {
  var users = this.getUsers(); //Returns the collection of Users
  for (var index = 0; index < users.length; index++) {
    //Compare each user-Id with the user Id we are interested in.
    if (users[index].id === this.id) {
      users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.
      return true; //returns true as a response
    }
  }
};

//Gets user's information as an object
User.prototype.retrieveDetails = function() {
  var users = this.getUsers(); //Returns the collection of Users
  for (var index = 0; index < users.length; index++) {
    //Compare each user-Id with the user Id we are interested in.
    if (users[index].id === this.id) {
      return users[index]; //returns the user found with the id as a response
    }
  }
};

//sets user's faculty
User.prototype.setFaculty = function(faculty) {
  this.faculty = faculty;
};

//sets user's department
User.prototype.setDepartment = function(department) {
  this.department = department;
};

//Updates user's gender
User.prototype.updateGender = function(gender) {
  this.gender = gender;
};

//Updates user's faculty
User.prototype.updateFaculty = function(faculty) {
  this.faculty = faculty;
};

//Updates user's department
User.prototype.updateDepartment = function(department) {
  this.department = department;
};

//This method saves user to the database
User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

//this method gets all users
User.prototype.getUsers = function() {
  return databaseHandler['users'];
};
module.exports = User; //Make this constructor available for external use by importation
