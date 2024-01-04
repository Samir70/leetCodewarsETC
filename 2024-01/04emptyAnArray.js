/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let tally = {}
  for (let n of nums) {
    tally[n] = (tally[n] || 0) + 1
  }
  let count = 0
  for (let k of Object.keys(tally)) {
    if (tally[k] === 1) {return -1}
    count += Math.ceil(tally[k] / 3)
  }
  return count
};


// const reduce = n => {
//   const known = [1, -1, 1, 1, 2, 2]
//   if (n < known.length) { return known[n] }
//   return n % 3 === 0 ? n / 3 : n % 3 === 1 ? 2 + (n - 4) / 3 : 1 + (n - 2) / 3
// }

const reduce = n => n === 1 ? -1 : Math.ceil(n / 3)

const tests4reduce = [
  { args: [1], out: -1 },
  { args: [2], out: 1 },
  { args: [3], out: 1 },
  { args: [4], out: 2 },
  { args: [5], out: 2 },
  { args: [6], out: 2 },
  { args: [7], out: 3 },
  { args: [8], out: 3 },
  { args: [9], out: 3 },
  { args: [10], out: 4 },
]

tests4reduce.forEach((t, i) => {
  let res = reduce(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

const tests = [
  { args: [[2, 3, 3, 2, 2, 4, 2, 3, 4]], out: 4 },
  { args: [[2, 1, 2, 2, 3, 3]], out: -1 },
];

tests.forEach((t, i) => {
  let res = minOperations(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});