// use elements at end of nums to reduce x to zero.
const minOperations = (nums, x) => {
  let sum = 0;
  let ans = Infinity;
  let cumalitiveLeft = new Map();
  cumalitiveLeft.set(0, 0);
  let i = 0
  while (i < nums.length) {
    sum += nums[i];
    cumalitiveLeft.set(sum, i + 1);
    if (sum > x) { break }
    // no point carrying on, 
    // negative values are not allowed in nums so sum will not go down.
    i++
  }
  if (cumalitiveLeft.has(x)) { ans = cumalitiveLeft.get(x) };
  if (i === nums.length) { return sum === x ? nums.length : -1 }
  // console.log(cumalitiveLeft, ans)
  // start suming elements from right, 
  // check if the complement was found while suming from left
  sum = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    sum += nums[i];
    // console.log('rightSum is', sum, 'looking for', x - sum)
    if (cumalitiveLeft.has(x - sum)) {
      ans = Math.min(ans, nums.length - i + cumalitiveLeft.get(x - sum))
    }
    if (sum > x) { break }
    // no negative values to bring sum down
  }
  return ans === Infinity || ans > nums.length ? -1 : ans
};

// This was faster, but is harder to follow
// work out best from left, and see if using right helps
var minOperationsNoMap = function (nums, x) {
  let leftSum = 0, rightSum = 0;
  let left = [], right = [];
  let ans = Infinity
  let i = 0;
  while (leftSum < x && i < nums.length) {
    leftSum += nums[i];
    left.push(nums[i]);
    i++
  }
  if (i === nums.length) {
    return leftSum === x ? nums.length : -1
  }
  i = nums.length;
  while (i > 0) {
    // console.log(left, right)
    if (leftSum + rightSum >= x) {
      if (leftSum + rightSum === x) {
        ans = Math.min(ans, left.length + right.length)
      }
      if (left.length) {
        leftSum -= left.pop()
      } else { return ans === Infinity ? -1 : ans }
    } else {
      i--;
      rightSum += nums[i];
      right.push(nums[i])
    }
  }
  return ans === Infinity ? -1 : ans
};

const tests = [
  { args: [[1, 1, 4, 2, 3], 5], out: 2 },
  { args: [[1, 1], 3], out: -1 },
  { args: [[5, 6, 7, 8, 9], 4], out: -1 },
  { args: [[5, 6, 7, 8, 9], 35], out: 5 },
  { args: [[5, 6, 7, 8, 9], 36], out: -1 },
  { args: [[3, 2, 20, 1, 1, 3], 10], out: 5 }
]

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