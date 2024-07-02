/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let tally = {}
  for (let n of nums1) {
    tally[n] = (tally[n] || 0) + 1
  }
  let out = []
  for (let n of nums2) {
    if (tally[n] > 0) {
      tally[n]--
      out.push(n)
    }
  }
  return out
};