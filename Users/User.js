function User(fullName, userType) {
  this.fullName = fullName;
  this.userType = userType;
  this.id = generateUserId();
}
User.prototype.getFullName = function() {
  return this.fullName;
};

function generateUserId() {}
module.exports = User;
