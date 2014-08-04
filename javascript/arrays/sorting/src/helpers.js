/**
 * some helper functions for unit tests in sorts
 */

/**
 * checkArray
 * @param arr
 * @param chk
 * takes in an array and a check function and runs the check function
 * on each element (think assertion function)
 */
var checkArray = function(arr, chk) {
  var tmp=arr[0];
  for (var j=1;j<arr.length;j++) {
    chk(tmp <= arr[j]);
    tmp = arr[j];
  }
};

/**
 * randArray
 * @param numElems
 * takes in the number of desired elements and returns an array containing that many
 * elements
 */
var randArray = function(numElems) {
  var arr=[];
  for (var i=0;i<numElems;i++) {
    arr.push(Math.floor((Math.random() * numElems)));
  }
  return arr;
};

module.exports = {
  checkArray: checkArray,
  randArray: randArray
};