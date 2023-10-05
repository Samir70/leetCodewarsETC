/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const mid = (a, b) => a + Math.floor((b - a) / 2)
var findMedianSortedArrays = function (nums1, nums2) {
  let left1 = 0, left2 = 0, right1 = nums1.length, right2 = nums2.length;
  let mergedLength = nums1.length + nums2.length;
  let targetIndex = mergedLength % 2 === 1 ? (mergedLength - 1) / 2 : (mergedLength / 2) - 1
  while (true) {
    let mid1 = mid(left1, right1), mid2 = mid(left2, right2);
    if (mid1 + mid2 === targetIndex) {
      if (mergedLength % 2 === 1) { return Math.min(nums1[mid1], nums2[mid2]) }
    }
    break
  }
};

const tests = [
  { args: [[1, 3], [2]], out: 2 },
  { args: [[1, 2], [3, 4]], out: 2.5 },
  { args: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11]], out: 6 },
  { args: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15]], out: 8 },
  { args: [[1, 2, 3, 4, 8, 9, 10], [5, 6, 7, 11, 12, 13, 14, 15]], out: 8 },
  { args: [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14]], out: 7.5 },
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