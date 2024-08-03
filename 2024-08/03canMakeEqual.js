/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
  let hash = Array(1001).fill(0)
  for (let i = 0; i < target.length; i++) {
    hash[target[i]]++
    hash[arr[i]]--
  }
  return hash.every(h => h === 0)
};

const tests = [
  { args: [[1, 2, 3, 4], [2, 4, 1, 3]], out: true },
  { args: [[7], [7]], out: true },
  { args: [[3, 7, 9], [3, 7, 11]], out: false },
];

tests.forEach((t, i) => {
  let res = canBeEqual(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});