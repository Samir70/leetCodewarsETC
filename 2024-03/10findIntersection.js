/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1), set2 = new Set(nums2)
  let intersect = new Set()
  for (let n of [...set1]) {
    if (set2.has(n)) { intersect.add(n) }
  }
  return [...intersect]
};

const tests = [
  { args: [[1, 2, 2, 1], [2, 2]], out: [2] },
  { args: [[4, 9, 5], [9, 4, 9, 8, 4]], out: [4, 9] },
];

tests.forEach((t, i) => {
  let res = intersection(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});