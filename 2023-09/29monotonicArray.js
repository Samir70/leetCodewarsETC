/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
  if (nums.length < 3) { return true }
  let relation = 'equal'
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) { continue }
    if (relation === 'equal') {
      relation = nums[i - 1] < nums[i] ? 'inc' : 'dec'
    }
    let curRelation = nums[i - 1] < nums[i] ? 'inc' : 'dec'
    if (curRelation !== relation) { return false }
  }
  return true
};

const tests = [
  { args: [[1, 2, 2, 3]], out: true },
  { args: [[1, 1, 1, 1, 1, 1, 2, 2, 3]], out: true },
  { args: [[1, 1, 1, 1, 1, 1, 2, 2, 3, 1]], out: false },
  { args: [[6, 5, 4, 4]], out: true },
  { args: [[6, 6, 6, 6, 6, 5, 4, 4]], out: true },
  { args: [[1, 3, 2]], out: false },
];

tests.forEach((t, i) => {
  let res = isMonotonic(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});