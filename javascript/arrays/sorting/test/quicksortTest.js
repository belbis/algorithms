/**
 * unittests for quicksort
 * @param test
 */

// local imports
var helpers = require('../src/helpers'),
  checkArray = helpers.checkArray,
  randArray = helpers.randArray;
var quicksort = require('../src/quicksort');


var testQuickSort = function(test) {
  // quicksort on empty array
  var arr = randArray(0);
  quicksort(arr);

  // quicksort on single element array
  arr = randArray(1);
  quicksort(arr);

  // quicksort on already sorted array
  arr = [1,2,3];
  quicksort(arr);
  checkArray(arr, test.ok);

  // quicksort on random elements
  arr = randArray(5);
  quicksort(arr);
  checkArray(arr, test.ok);

  // quicksort with cutoff using insertion sort
  arr = randArray(20);
  quicksort(arr, 0, arr.length-1, 20);
  checkArray(arr, test.ok);

  // quicksort 10000 elements using insertion sort
  arr = randArray(10000);
  quicksort(arr, 0, arr.length-1, 20);
  checkArray(arr, test.ok);

  // call done
  test.done();
};

exports.testQuickSort = testQuickSort;