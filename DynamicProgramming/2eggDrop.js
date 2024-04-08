/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (t) {
  /**
 * throws for first egg; second egg
 * 3; 1, 2 || 3, 5; 4 || 3, 5, 6
 * 7; 1..6 || 7, 13; 8..12 || 7, 13, 18; 14..17 ||...
 *    best case: 7, 13, 18, 22, 25, 27, 28 = Tri(7) 
 *  n2 + n - 2t = 0
 * 2n = -1 + sqrt(1 + 8t)
 */
  return Math.ceil((-1 + Math.sqrt(1 + 8 * t)) / 2)
};

const tests = [
  { args: [2], out: 2 },
  { args: [3], out: 2 },
  { args: [4], out: 3 },
  { args: [5], out: 3 },
  { args: [6], out: 3 },
  { args: [7], out: 4 },
  { args: [100], out: 14 }
];

tests.forEach((t, i) => {
  let res = twoEggDrop(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});