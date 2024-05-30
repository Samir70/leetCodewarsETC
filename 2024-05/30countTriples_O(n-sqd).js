/**
 * @param {number[]} arr
 * @return {number}
 */
// passes, but beats only 21% (but only a few completions)
var countTriplets = function (arr) {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    let total = 0
    for (let j = i; j < arr.length; j++) {
      total ^= arr[j]
      if (total === 0) {
        // console.log(`Array of length ${j - i + 1} has total 0`, { i, j, total })
        count += j - i
        // xor is commutative: split a^b^c^d has 3 choices for split
      }
    }
  }
  return count
};

const tests = [
  { args: [[2, 3, 1, 6, 7]], out: 4 },
  { args: [[1, 1, 1, 1, 1]], out: 10 },
];

tests.forEach((t, i) => {
  let res = countTriplets(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});