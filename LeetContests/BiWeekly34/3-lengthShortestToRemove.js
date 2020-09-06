/**
 * given an unsorted array of integers
 * find the shortest subarray such that when it is removed, what is left is sorted
 * 
 * hint:
 * After removing some subarray, 
 * the result is the concatenation of a sorted prefix and a sorted suffix, 
 * where the last element of the prefix is smaller than the first element of the suffix.
 * 
 */

const findLengthOfShortestSubarray = arr => {

}

const tests = [
    { in: [1, 2, 3, 10, 4, 2, 3, 5], out: 3 },
    { in: [5, 4, 3, 2, 1], out: 4 },
    { in: [1, 2, 3], out: 0 },
    { in: [1], out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, findLengthOfShortestSubarray(t.in) === t.out
))