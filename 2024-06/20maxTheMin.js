/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function (position, m) {
  position.sort((a, b) => a - b)
  let left = 1, right = position[position.length - 1]
  while (left < right) {
    let mid = Math.ceil((left + right) / 2)
    let canPlace = canPlaceWithDist(position, m, mid)
    if (canPlace) {
      left = mid
    } else {
      right = mid - 1
    }
  }
  return left
};
const canPlaceWithDist = (nums, m, d) => {
  let count = 1, val = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - val >= d) {
      count++
      val = nums[i]
    }
  }
  return count >= m
}

const tests = [
  { args: [[1, 2, 3, 4, 7], 3], out: 3 },
  { args: [[1, 2, 3], 3], out: 1 },
  { args: [[1, 3, 5], 3], out: 2 },
  { args: [[5, 4, 3, 2, 1, 1000000000], 2], out: 1000000000 - 1 },
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