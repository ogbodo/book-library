var databaseHandler = require('../Library/database/Database'); //Import the database

//User constructor definition
function User(firstName, lastName, gender, userType) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.userType = userType;
  this.id = generateUserId();
  this.save();
}

//Gets user's firstname
User.prototype.getFirstName = function() {
  return this.firstName;
};

//Gets user's lastname
User.prototype.getLastName = function() {
  return this.lastName;
};

//Upates user's firstname
User.prototype.updateFirstName = function(name) {
  this.firstName = name;
};

//Upates user's lastname
User.prototype.updateLastName = function(name) {
  this.lastName = name;
};

//Enables user to delete own account
User.prototype.deleteAccount = function() {
  var users = getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      users.splice(index, 1);
      return true;
    }
  }
};

//Gets user's information as an object
User.prototype.retrieveDetails = function() {
  var users = getUsers();
  for (var index = 0; index < users.length; index++) {
    if (users[index].id === this.id) {
      return users[index];
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

//Upates user's gender
User.prototype.updateGender = function(gender) {
  this.gender = gender;
};

//Upates user's faculty
User.prototype.updateFaculty = function(faculty) {
  this.faculty = faculty;
};

//Upates user's department
User.prototype.updateDepartment = function(department) {
  this.department = department;
};

//Generates a unique id for users
function generateUserId() {
  var users = getUsers();
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}

//This method saves user to the database
User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

//this function gets all users
function getUsers() {
  return databaseHandler['users'];
}
module.exports = User; //Make this class available for external use by importation
