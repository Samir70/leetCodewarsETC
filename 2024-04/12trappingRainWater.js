/**
 * @param {number[]} height
 * @return {number}
 */
// 80ms, beats 80%
// there is a faster version where each height is read once.
var trap = function (height) {
  let fromLeft = [], fromRight = [];
  let maxL = 0, maxR = 0;
  for (let left = 0; left < height.length; left++) {
    let right = height.length - 1 - left;
    if (height[left] > maxL) { maxL = height[left] }
    if (height[right] > maxR) { maxR = height[right] }
    fromLeft.push(maxL - height[left])
    fromRight.push(maxR - height[right])
  }
  fromRight.reverse()
  // console.log(fromLeft, fromRight);
  let sum = 0;
  for (let i = 0; i < height.length; i++) {
    sum += Math.min(fromLeft[i], fromRight[i])
  }
  return sum
};

const tests = [
  { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], out: 6 },
  { args: [[4, 2, 0, 3, 2, 5]], out: 9 },
];

tests.forEach((t, i) => {
  let res = trap(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});