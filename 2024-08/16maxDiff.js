/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
  let [min, max] = [Infinity, -Infinity]
  let maxDiff = 0
  for (let arr of arrays) {
    let [low, high] = [arr[0], arr[arr.length - 1]]
    if (min === Infinity) {
      min = low; max = high
    } else {
      let [a, b] = [max - low, high - min]
      // console.log({ min, max, low, high, a, b })
      maxDiff = Math.max(maxDiff, a, b)
      max = Math.max(max, high)
      min = Math.min(min, low)
    }
  }
  return maxDiff
};

const tests = [
  { args: [[[1, 2, 3], [4, 5], [1, 2, 3]]], out: 4 },
  { args: [[[2, 3], [4, 5], [1, 2, 3]]], out: 4 },
  { args: [[[6, 7], [4, 5], [5, 6, 7, 8, 9, 10]]], out: 6 },
  { args: [[[6, 7], [4, 5], [1]]], out: 6 },
  { args: [[[4, 5], [1, 2, 3]]], out: 4 },
  { args: [[[1], [1]]], out: 0 },
];

tests.forEach((t, i) => {
  let res = maxDistance(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});