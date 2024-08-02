/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
  let cumSum = [], sum = 0
  for (let n of nums) {
    sum += n
    cumSum.push(sum)
  }
  // console.log({ nums, cumSum })
  if (sum <= 1 || sum >= nums.length - 1) { return 0 }
  let [left, right] = [0, sum - 1]
  let min2Change = Infinity
  while (left < nums.length) {
    let oneCount
    if (left === 0) {
      oneCount = cumSum[right]
    } else if (right < nums.length) {
      oneCount = cumSum[right] - cumSum[left - 1]
    } else {
      oneCount = sum - cumSum[left - 1] + cumSum[right % nums.length]
    }
    min2Change = Math.min(min2Change, sum - oneCount)
    // console.log({ left, right, oneCount, min2Change })
    left++; right++
  }
  return min2Change
};

const tests = [
  { args: [[0, 1, 0, 1, 1, 0, 0]], out: 1 },
  { args: [[0, 1, 0, 0, 0]], out: 0 },
  { args: [[0, 1, 1, 1, 1, 1, 1]], out: 0 },
  { args: [[0, 1, 1, 1, 1, 1, 1, 0, 0]], out: 0 },
  { args: [[0, 1, 1, 1, 0, 0, 1, 1, 0]], out: 2 },
  { args: [[0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1]], out: 4 },
  { args: [[1, 1, 0, 0, 1]], out: 0 },
];

tests.forEach((t, i) => {
  let res = minSwaps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});