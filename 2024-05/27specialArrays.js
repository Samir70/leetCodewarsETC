/**
 * @param {number[]} nums
 * @return {number}
 */
var specialArray = function (nums) {
  let tally = Array(1001).fill(0), max = 0
  for (let n of nums) { 
    tally[n]++ 
    max = Math.max(max, n)
  }
  let sum = 0
  for (let i = max; i >= 0; i--) {
    sum += tally[i]
    if (sum === i) {return i}
  }
  return -1
};

const tests = [
  { args: [[3, 5]], out: 2 },
  { args: [[0, 0]], out: -1 },
  { args: [[0, 4, 3, 0, 4]], out: 3 },
]

tests.forEach((t, i) => {
  let res = specialArray(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});