/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function (nums1, nums2) {
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) { return nums1[i] }
    nums1[i] < nums2[j] ? i++ : j++
  }
  return -1
};

/**
 * Binary search second array for each value of first
 * More efficient if the second is sig longer than first
 * O(n + m) VS (n * logm)
 */

// Slower with a set
// var getCommon = function(nums1, nums2) {
//   let numsSet = new Set(nums1)
//   for (let n of nums2) {
//       if (numsSet.has(n)) {return n}
//   }
//   return -1
// };

const tests = [
  { args: [[1, 2, 3], [2, 4]], out: 2 },
  { args: [[1, 2, 3, 6], [2, 3, 4, 5]], out: 2 },
  { args: [[1, 2, 3, 6], [4, 5]], out: -1 },
];

tests.forEach((t, i) => {
  let res = getCommon(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});