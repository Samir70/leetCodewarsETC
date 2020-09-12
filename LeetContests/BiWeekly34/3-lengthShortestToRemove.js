/**
 * given an unsorted array of integers
 * find the shortest subarray such that when it is removed, what is left is sorted
 * 
 * hint:
 * After removing some subarray, 
 * the result is the concatenation of a sorted prefix and a sorted suffix, 
 * where the last element of the prefix is smaller than the first element of the suffix.
 * 
 * let i be the index of the last element in inc subarray from start
 * let j be the index of the first inc subarray at the end of the array
 * 
 * 3 options, remove:
 * -- 0 to j-1
 * -- elements in the middle
 * -- i+1 to end
 */

const findLengthOfShortestSubarray = arr => {
    let i = 0;
    while (i + 1 < arr.length && arr[i] <= arr[i + 1]) { i++ }
    if (i === arr.length - 1) { return 0 }
    let j = arr.length - 1;
    while (j > 1 && arr[j - 1] <= arr[j]) { j-- };
    // consider cutting a bit from the beginning or the end
    let toRemove = Math.min(arr.length - i - 1, j)
    // can we beat this by removing a middle section?
    let left = 0, right = j;
    // console.log(arr, i, j)
    while (left <= i && right < arr.length) {
        if (arr[left] <= arr[right]) {
            left++
        } else {
            right++
        }
        toRemove = Math.min(toRemove, right - left)
        // console.log(left, right, toRemove)
    }
    return toRemove
}

const tests = [
    { in: [1, 2, 3, 10, 4, 2, 3, 5], out: 3 },
    { in: [5, 4, 3, 2, 1], out: 4 },
    { in: [1, 2, 3, 10, 0, 7, 8, 9], out: 2 },
    { in: [1, 2, 3], out: 0 },
    { in: [1], out: 0 },
    { in: [1, 3, 2, 4], out: 1 }, // inital attempt gave -1
    { in: [1, 2, 3, 3, 10, 1, 3, 3, 5], out: 2 }, // WA: 3
    { in: [1, 2, 2, 2, 2, 2, 3, 1, 7, 5, 1, 2, 2, 2, 2, 2, 2, 5, 6], out: 5 } //WA:10
];

tests.forEach((t, i) => console.log(
    'test', i, findLengthOfShortestSubarray(t.in) === t.out
))