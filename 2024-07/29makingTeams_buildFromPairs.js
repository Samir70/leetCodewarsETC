/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  let incPairs = Array(rating.length).fill(0)
  let decPairs = Array(rating.length).fill(0)
  for (let i = 1; i < rating.length; i++) {
    for (let j = i + 1; j < rating.length; j++) {
      rating[j] > rating[i] ? incPairs[i]++ : decPairs[i]++
    }
  }
  let count = 0
  // console.log({ incPairs, decPairs })
  for (let i = 0; i < rating.length - 2; i++) {
    for (let j = i + 1; j < rating.length; j++) {
      count += rating[i] < rating[j] ? incPairs[j] : decPairs[j]
    }
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