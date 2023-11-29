/**
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = n => n === 0 ? 0 : 1 + hammingWeight(n & (n - 1));

const tests = [
  {args: [2], out: 1},
  {args: [4], out: 1},
  {args: [8], out: 1},
  {args: [17], out: 2},
  {args: [1023], out: 10},
];

tests.forEach((t, i) => {
  let res = hammingWeight(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});