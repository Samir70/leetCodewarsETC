/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // piles.sort((a, b) => a - b)
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    let eatingFastEnough = canEatAll(piles, h, mid)
    if (eatingFastEnough) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
};
const canEatAll = (nums, h, perHr) => {
  let hoursNeeded = nums.map(n => Math.ceil(n / perHr)).reduce((a, c) => a + c)
  return hoursNeeded <= h
}

const tests = [
  { args: [[3, 6, 7, 11], 8], out: 4 },
  { args: [[3, 3, 4], 5], out: 3 },
  { args: [[3, 3, 4], 88], out: 1 },
  { args: [[30, 11, 23, 4, 20], 5], out: 30 },
  { args: [[30, 11, 23, 4, 20], 6], out: 23 },
];

tests.forEach((t, i) => {
  let res = minEatingSpeed(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});