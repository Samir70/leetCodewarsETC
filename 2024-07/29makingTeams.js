/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  let count = 0
  for (let mid = 1; mid < rating.length; mid++) {
    let [leftSmaller, leftLarger] = [0, 0]
    let [rightSmaller, rightLarger] = [0, 0]
    for (let left = 0; left < mid; left++) {
      rating[left] < rating[mid] ? leftSmaller++ : leftLarger++
    }
    for (let right = mid + 1; right < rating.length; right++) {
      rating[right] < rating[mid] ? rightSmaller++ : rightLarger++
    }
    // console.log({ mid, leftSmaller, rightLarger, leftLarger, rightSmaller })
    count += leftSmaller * rightLarger
    count += leftLarger * rightSmaller
  }
  return count
};

const tests = [
  { args: [[2, 5, 3, 4, 1]], out: 3 },
  { args: [[2, 1, 3]], out: 0 },
  { args: [[1, 2, 3, 4]], out: 4 },
];

tests.forEach((t, i) => {
  let res = numTeams(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});