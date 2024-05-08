/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  const rank = (s) => {
    switch (s) {
      case 1: { return "Gold Medal" }
      case 2: { return "Silver Medal" }
      case 3: { return "Bronze Medal" }
      default: { return "" + s }
    }
  }
  let sorted = [...score].map((s, i) => [s, i]).sort((a, b) => b[0] - a[0])
  for (let i = 0; i < score.length; i++) {
    let [s, idx] = sorted[i]
    score[idx] = rank(i + 1)
    // console.log({ s, idx, i, r: rank(i + 1) })
    // console.log(score)
  }
  return score
};

const tests = [
  { args: [[5, 4, 3, 2, 1]], out: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"] },
  { args: [[10, 3, 8, 9, 4]], out: ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"] },
];

tests.forEach((t, i) => {
  let res = findRelativeRanks(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});