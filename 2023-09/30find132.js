var find132patternSlow = function (nums) {
  if (nums.length < 3) { return false }
  let smallestSoFar = nums[0];
  let goodRanges = [];
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] <= smallestSoFar) {
      smallestSoFar = nums[i]
    } else {
      goodRanges.push({ index: i, low: smallestSoFar, high: nums[i] })
    }
  }
  // now loook for a suitable third number
  if (goodRanges.length === 0) { return false }
  console.log(goodRanges)
  for (let i = 2; i < nums.length; i++) {
    let curRangeIndex = 0;
    while (curRangeIndex < goodRanges.length && goodRanges[curRangeIndex].index < i) {
      if (nums[i] < goodRanges[curRangeIndex].high && nums[i] > goodRanges[curRangeIndex].low) { return true }
      curRangeIndex++

    }
  }
  return false
};

/**
 * 
 * @param {[Number]} nums 
 * @returns boolean
 * Looking for numbers with indices i < j < k
 * where nums[i] < nums[k] < nums[j]
 */
var find132pattern = function (nums) {
  if (nums.length < 3) return false;

  let secondLargest = -Infinity
  let stack = []

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < secondLargest) return true;
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      secondLargest = stack.pop()
    }

    stack.push(nums[i])
  }
  return false
};

const tests = [
  { args: [[1, 2, 3, 4]], out: false },
  { args: [[3, 1, 4, 2]], out: true },
  { args: [[-1, 3, 2, 0]], out: true },
  { args: [[10, 9, 8, 7, 6, 5]], out: false },
  { args: [[10, 9, 8, 10, 6, 9]], out: true },
  { args: [[1, 0, 1, -4, -3]], out: false }, //naive graph method fails to this
  { args: [[1, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 1, -4, -3]], out: true }
];

tests.forEach((t, i) => {
  let res = find132pattern(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});