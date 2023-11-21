/**
 * @param {number[]} nums
 * @return {number}
 */
const rev = n => Number([...'' + n].reverse().join(''))
var countNicePairs = function (nums) {
  // nums[i] + revs[j] === revs[i] + nums[j]
  // means
  // nums[i] - revs[i] === nums[j] - revs[j]
  // 21 - 12 = 9 and 32 - 23 = 9
  // 21+23 = 44 = 32+12
  // but 12+23 = 35 != 32+21
  let count = 0;
  let hash = {}
  for (let n of nums) {
    let diff = n - rev(n);
    if (hash[diff] === undefined) { hash[diff] = [] }
    count += hash[diff].length;
    hash[diff].push(n)
  }
  return count % (10 ** 9 + 7)
};

const tests = [
  { args: [[42, 11, 1, 97]], out: 2 },
  { args: [[13, 10, 35, 24, 76]], out: 4 },
];

tests.forEach((t, i) => {
  let res = countNicePairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});