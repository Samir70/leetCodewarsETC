/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * We are given an array of integers nums and there is a sliding window of size k 
 * which is moving from the left of the array to the right.
 * Our task is to return a list of integers that contains 
 * the largest element from each window.
 */

const maxSlidingWindowSlow = (nums, k) => {
  if (k === 1) { return nums }
  let left = 0, right = 1;
  let indexOfMax = 0, max = nums[0];
  let out = []
  while (right < nums.length) {
    while (right - left < k) {
      if (nums[right] > max) {
        max = nums[right];
        indexOfMax = right;
      }
      right++
    }
    out.push(max);
    left++;
    if (left > indexOfMax) {
      indexOfMax = left; max = nums[left];
      for (let i = left; i < right; i++) {
        if (nums[i] > max) {
          indexOfMax = i; max = nums[i];
        }
      }
    }
  }
  return out
};

// fastest version, beats nearly 79%
var maxSlidingWindow = function(nums, k) {
  if (k === 1) {return nums}
  let stack = [[nums[0], 0]], firstInQueue = 0;
  // hacking a monotonic decreasing queue,
  // firstInQueue points to elements that might still be needed, 
  // and is incremented when the element moves out of the window
  let out = []
  for (let i = 1; i < nums.length; i++) {
      while (stack[firstInQueue][1] < i - k) {firstInQueue++}
      // console.log(stack, firstInQueue) 
      if (i >= k ) {out.push(stack[firstInQueue][0])}
      while (stack.length > firstInQueue && stack[stack.length - 1][0] < nums[i]) {stack.pop()}
      stack.push([nums[i], i])
  }
  while (stack[firstInQueue][1] < nums.length - k) {firstInQueue++}
  // console.log(stack, firstInQueue)
  out.push(stack[firstInQueue][0])
  return out
};

const tests = [
  { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], out: [3, 3, 5, 5, 6, 7] },
  { args: [[1, 3, 1, 2, 0, 5], 3], out: [3, 3, 2, 5] },
  { args: [[9, 10, 9, -7, -4, -8, 2, -6], 5], out: [10, 10, 9, 2] },
  { args: [[1], 1], out: [1] }
];

tests.forEach((t, i) => {
  let res = maxSlidingWindow(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});