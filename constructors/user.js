var databaseHandler = require('../database/database'); //Import the database
var generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//User constructor definition
function User(firstName, lastName, gender, userType, faculty, department) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.userType = userType;
  this.department = department;
  this.faculty = faculty;

  this.id = generateId(this.getUsers()); //Generates a new Id for this User

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

//Updates user's details
User.prototype.updatePersonalDetails = function(
  firstName,
  lastName,
  gender,
  faculty,
  department
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.department = department;
  this.faculty = faculty;
};

//Enables user to delete own account
User.prototype.delete = function() {
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

//This method saves user to the database
User.prototype.save = function() {
  databaseHandler['users'].push(this);
};

//this method gets all users
User.prototype.getUsers = function() {
  return databaseHandler['users'];
};
module.exports = User; //Make this constructor available for external use by importation
