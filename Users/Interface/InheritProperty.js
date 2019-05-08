module.exports = function(supperClass, childClass) {
  childClass.prototype = Object.create(supperClass.prototype);
  childClass.constructor = childClass;
};
