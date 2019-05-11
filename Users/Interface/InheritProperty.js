//This is where the prototypal inheritance occures and gets exported for external use by importation.
module.exports = function(supperClass, childClass) {
  childClass.prototype = Object.create(supperClass.prototype); //Make the child class inherite the prototype of the superclass
  childClass.constructor = childClass; //Manually assign the constructor of the child class to point to the child class instead of the parent class which happend during inheritance.
};
