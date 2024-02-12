/**
 * @param {number[]} nums
 * @return {number}
 */
// var majorityElement = function(nums) {
//   const mustBe = nums.length % 2 ? (nums.length - 1)/2 : nums.length/2 - 1
//   return nums.sort((a, b) => a-b)[mustBe]
// };
const majorityElement = nums => {
  let [a, countA] = [0, 0];
  for (let n of nums) {
    if (n === a) {
      countA++
    } else if (countA === 0) {
      [a, countA] = [n, 1]
    } else {
      countA--;
    }
    // console.log({ a, countA })
  }
  return a
}

const tests = [
  { args: [[3, 2, 3]], out: 3 },
  { args: [[2, 2, 1, 1, 1, 2, 2]], out: 2 },
  { args: [[42]], out: 42 },
];

tests.forEach((t, i) => {
  let res = majorityElement(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});