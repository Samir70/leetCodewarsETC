/**
 * @param {number[]} nums
 * @return {number}
 * count number of arithmetic subsequences in array nums
 */
var numberOfArithmeticSlices = function (nums) {
  const subSeqEndingAtIdx = [];
  for (let n of nums) { subSeqEndingAtIdx.push({}) }
  let count = 0;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      let diff = nums[i] - nums[j]
      subSeqEndingAtIdx[i][diff] = subSeqEndingAtIdx[i][diff] || 0;
      subSeqEndingAtIdx[i][diff] += (subSeqEndingAtIdx[j][diff] || 0) + 1;
      count += subSeqEndingAtIdx[j][diff] || 0
    }
  }
  // console.log(subSeqEndingAtIdx)
  return count
};

const tests = [
  { args: [[2, 4, 6, 8, 10]], out: 7 },
  { args: [[7, 7, 7, 7, 7]], out: 16 },
  { args: [[2, 2, 3, 4]], out: 2 },
];

tests.forEach((t, i) => {
  let res = numberOfArithmeticSlices(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});