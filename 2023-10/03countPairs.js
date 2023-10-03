/**
 * pairs of numbers i, j such that
 * nums[i] === nums[j] and i != j
 * 
 * my sol: tally and use t choose 2
 * but this Tri(t-1), or 1+2+3...+(t-1)
 */

var numIdenticalPairsOld = function (nums) {
  var tally = Array(101).fill(0);
  for (var n of nums) { tally[n]++ }
  return tally.map(t => t < 2 ? 0 : (t * (t - 1)) / 2)
    .reduce((a, b) => a + b, 0)
};


var numIdenticalPairs = nums => {
  var tally = Array(101).fill(0);
  var out = 0;
  for (var n of nums) {
    out += tally[n]++;
  }
  return out
}

const tests = [
  { args: [[1, 2, 3, 1, 1, 3]], out: 4 },
  { args: [[1, 1, 1, 1]], out: 6 },
  { args: [[1, 2, 3]], out: 0 },
];

tests.forEach((t, i) => {
  let res = numIdenticalPairs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});