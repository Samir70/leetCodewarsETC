/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  // This array contains object giving length of seq ending at i with diffs as keys
  let subSeqEndAtI = [];
  for (let i = 0; i < nums.length; i++) {
    subSeqEndAtI.push({})
  }
  let maxLen = 2; // nums.length is at least 2
  for (let i = 1; i < nums.length; i++) {
    let n = nums[i]
    for (let j = 0; j < i; j++) {
      let diff = n - nums[j];
      subSeqEndAtI[i][diff] = subSeqEndAtI[j][diff] === undefined ? 2 : subSeqEndAtI[j][diff] + 1
      maxLen = Math.max(maxLen, subSeqEndAtI[i][diff])
    }
  }
  // console.log(nums, subSeqEndAtI)
  return maxLen
};

let bigTest = []
for (let i = 0; i < 1000; i++) {bigTest.push(Math.floor(Math.random() * 500))}
console.log(bigTest.join(", "))

const tests = [
  { args: [[3, 6, 9, 12]], out: 4 },
  { args: [[9, 4, 7, 2, 10]], out: 3 },
  { args: [[20, 1, 15, 3, 10, 5, 8]], out: 4 }
];

tests.forEach((t, i) => {
  let res = longestArithSeqLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});