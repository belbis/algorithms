/**
 * Created by belbis on 8/3/14.
 */

// local imports
var helpers = require('../src/helpers'),
  checkArray = helpers.checkArray,
  randArray = helpers.randArray;
var insertionsort = require('../src/insertionsort');

/**
 * unit tests for insertion sort
 */
var testInsertionSort = function(test) {

  // empty array
  var arr = randArray(0);
  insertionsort(arr);
  checkArray(arr, test.ok);

  // single element array
  arr=randArray(1);
  insertionsort(arr);
  checkArray(arr, test.ok);

  // already sorted array
  arr = [1, 2, 3];
  insertionsort(arr);
  checkArray(arr, test.ok);

  // random array
  arr = randArray(100);
  insertionsort(arr);
  checkArray(arr, test.ok);

  test.done();
};

exports.testInsertionSort = testInsertionSort;