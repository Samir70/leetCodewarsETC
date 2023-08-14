// obv80ms 76%
var findKthLargestBySorting = function (nums, k) {
  nums.sort((a, b) => b - a)
  return nums[k - 1]
};

// 84ms beats 61%
const rndFrom = arr => arr[Math.floor(Math.random() * arr.length)]
var findKthLargest = function (nums, k) {
  let lower = [], equal = [], higher = [];
  let cur = rndFrom(nums)
  for (let n of nums) {
    if (n < cur) {
      lower.push(n)
    } else if (n === cur) {
      equal.push(n)
    } else {
      higher.push(n)
    }
  }
  if (higher.length >= k) { return findKthLargest(higher, k) }
  let atleast = higher.length + equal.length
  // console.log(nums, k, lower, equal, higher)
  return atleast >= k ? cur : findKthLargest(lower, k - atleast)
};

const tests = [
  { args: [[3, 2, 1, 5, 6, 4], 2], out: 5 },
  { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], out: 4 },
];

tests.forEach((t, i) => {
  let res = findKthLargest(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});