/**
 * @param {number[]} arr
 * @return {number}
 */
// passes, but beats only 7%
var countTriplets = function (arr) {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    let total = 0
    for (let j = i + 1; j < arr.length; j++) {
      total ^= arr[j - 1]
      let fromJ = 0
      for (let k = j; k < arr.length; k++) {
        fromJ ^= arr[k]
        if (fromJ === total) {
          // console.log({i, j, k, total, fromJ})
          count++        
        }
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