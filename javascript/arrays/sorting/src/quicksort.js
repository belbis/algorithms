/**
 * Quick sort implementation for javascript
 *
 * algorithm adapted from:
 * http://en.wikipedia.org/wiki/Quicksort
 *
 * Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-array:
 * the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.
 *
 *  The steps are:
 *
 *  Pick an element, called a pivot, from the array.
 *  Reorder the array so that all elements with values less than the pivot come before the pivot, while all
 *  elements with values greater than the pivot come after it (equal values can go either way).
 *  After this partitioning, the pivot is in its final position. This is called the partition operation.
 *  Recursively apply the above steps to the sub-array of elements with smaller values and separately
 *  to the sub-array of elements with greater values.
 *  The base case of the recursion is arrays of size zero or one, which never need to be sorted.
 *  In pseudocode, a quicksort that sorts elements i through k (inclusive)
 *  of an array A can be expressed compactly as[5]:171
 *
 *
 *  Optimizations:
 *
 *  To make sure at most O(log N) space is used, recurse first into the smaller side of the partition,
 *  then use a tail call to recurse into the other.
 *
 *  Use insertion sort, which has a smaller constant factor and is thus faster on small arrays,
 *  for invocations on small arrays (i.e. where the length is less than a threshold k determined experimentally).
 *  This can be implemented by simply stopping the recursion when less than k elements are left,
 *  leaving the entire array k-sorted: each element will be at most k positions away from its final position.
 *  Then, a single insertion sort pass finishes the sort in O(k×n) time.
 *  A separate insertion sort of each small segment as they are identified adds the overhead of
 *  starting and stopping many small sorts, but avoids wasting effort comparing keys across the many segment
 *  boundaries, which keys will be in order due to the workings of the quicksort process.
 *
 */

var insertionsort = require('./insertionsort');

var quicksort = function(arr, idx , len, cutoff) {
  // don't require idx or len

  if (typeof idx ==='undefined') idx = 0;
  if (typeof len === 'undefined') len = arr.length-1;

  // cutoff is only used with insertion sort optimization
  if((cutoff && len-idx < cutoff)) {
    insertionsort(arr, idx, len+1);
  } else if (idx < len) { // recurse over left and right partitions
    var pivot = partition(arr, idx, len),
      pivotPlusOne=pivot+1,
      pivotMinusOne=pivot-1;
    // optimization recommended by sedgewick,
    // recurse over smaller partition first
    if (pivotMinusOne-idx < len-pivotPlusOne) {
      quicksort(arr, idx, pivotMinusOne);
      quicksort(arr, pivotPlusOne, len);
    } else {
      quicksort(arr, pivotPlusOne, len);
      quicksort(arr, idx, pivotMinusOne);
    }
  }
};

/**
 * partition
 * @param arr - the array to be partitioned
 * @param left - the begin index
 * @param right - the end index
 * @returns storeIndex - the index the pivot was placed
 * kinda the most important method in the quicksort implementation
 * basically selects the pivot using the selectPivot method,
 * then walks through the array ensuring that the elements to the left of the pivot are less than or
 * equal, and the right are greater than. returns the position that the pivot was placed
 */
var partition = function(arr, left, right) {
  var pivotIndex = selectPivot(arr, left, right),
    pivotValue = arr[pivotIndex],
    swapValue,
    storeIndex = left; // initially start at left

  // swap pivot and end of array
  swapValue = arr[right];
  arr[right] = arr[pivotIndex];
  arr[pivotIndex] = swapValue;

  for (var i=left;i<right;i++) {
    if (arr[i] <= pivotValue) {
      // swap value and storeIndex
      swapValue = arr[storeIndex];
      arr[storeIndex] = arr[i];
      arr[i] = swapValue;
      storeIndex += 1;
    }
  }

  // swap end of array and storeIndex
  swapValue = arr[right];
  arr[right] = arr[storeIndex];
  arr[storeIndex] = swapValue;
  return storeIndex
};

/**
 * selectPivot
 * @param arr - the array
 * @param right - the end index
 * @param left - the start index
 * @returns {number}
 * method for selecting the pivot index
 * chooses the median of the first, middle and last element of the partition
 * for the pivot (as recommended by Sedgewick).
 */
var selectPivot = function(arr, left, right) {
  var v1 = arr[left],
    v2 = arr[right],
    mid= left + Math.round((right-left)/2),
    v3 = arr[mid];

  // comparison for median value selection
  // it's ugly i know
  if (v1 > v2) {
    if (v2 > v3) {
      return mid
    } else if (v1 > v3) {
      return right
    } else {
      return left
    }
  } else {
    if (v1 > v3) {
      return left
    } else if (v2 > v3) {
      return right
    } else {
      return mid
    }
  }
};

module.exports = quicksort;
