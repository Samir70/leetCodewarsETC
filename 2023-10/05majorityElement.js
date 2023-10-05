/**
 * @param {number[]} nums
 * @return {number[]}
 */
// var majorityElement = function (nums) {
//   let hash = {}
//   for (let n of nums) { hash[n] = (hash[n] || 0) + 1 }
//   let third = nums.length / 3
//   let out = []
//   for (let n of Object.keys(hash)) {
//     if (hash[n] > third) {out.push(n)}
//   }
//   return out
// };

// Bayer-Moore alogorithm
// https://leetcode.com/problems/majority-element-ii/solutions/63520/boyer-moore-majority-vote-algorithm-and-my-elaboration/
const majorityElement = nums => {
  let [a, countA, b, countB] = [0, 0, 1, 0];
  for (let n of nums) {
    if (n === a) {
      countA++
    } else if (n === b) {
      countB++
    } else if (countA === 0) {
      [a, countA] = [n, 1]
    } else if (countB === 0) {
      [b, countB] = [n, 1]
    } else {
      countA--;
      countB--
    }
    // console.log({ a, b, countA, countB })
  }
  [countA, countB] = [0, 0]
  for (let n of nums) {
    if (n === a) { countA++ }
    if (n === b) { countB++ }
  }
  // console.log('final', { a, b, countA, countB })
  let out = []
  if (countA > nums.length / 3) { out.push(a) }
  if (countB > nums.length / 3) { out.push(b) }
  return out
}

const tests = [
  { args: [[3, 2, 3]], out: [3] },
  { args: [[1]], out: [1] },
  { args: [[1, 2]], out: [1, 2] },
];

tests.forEach((t, i) => {
  let res = majorityElement(...t.args).sort((a, b) => a - b);
  if (res.join(',') !== t.out.join(',')) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});