/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let n = nums1.length + nums2.length;
  // let left, right be index of 'neighbours' to median in merged array
  let left = n % 2 === 1 ? (n - 1) / 2 : (n / 2) - 1
  let right = n % 2 === 1 ? left : left + 1
  let pointerA = 0, pointerB = 0, median = 0;
  for (let i = 0; i < n; i++) {
    let a = nums1[pointerA] === undefined ? Infinity : nums1[pointerA]
    let b = nums2[pointerB] === undefined ? Infinity : nums2[pointerB]
    a <= b ? pointerA++ : pointerB++
    cur = a <= b ? a : b
    // console.log({n, i, left, right, a, b, cur})
    if (i === left) { median += cur }
    if (i === right) {
      median += cur;
      return median / 2
    }
  }
  return "How did we get here?"
};

const tests = [
  { args: [[1, 3], [2]], out: 2 },
  { args: [[1, 2], [3, 4]], out: 2.5 },
  { args: [[0, 0], [0, 0]], out: 0 },
  { args: [[1, 2, 3, 4, 5, 6, 7, 8, 34, 67, 100, 1009], [3, 4, 6, 8, 12, 14, 15, 16, 16, 18, 77, 77, 77, 77, 77, 77]], out: 14.5 }
];

tests.forEach((t, i) => {
  let res = findMedianSortedArrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});