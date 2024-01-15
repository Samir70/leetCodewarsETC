/**
 * @param {number[][]} matches
 * @return {number[][]}
 */
var findWinners = function (matches) {
  let countOfLoses = {}
  for (let [winner, loser] of matches) {
    countOfLoses[winner] = (countOfLoses[winner] || 0)
    countOfLoses[loser] = (countOfLoses[loser] || 0) + 1
  }
  // console.log(countOfLoses)
  let playedButNoLosses = [], playedButOneLoss = [];
  for (let player in countOfLoses) {
    if (countOfLoses[player] === 0) {
      playedButNoLosses.push(player)
    } else if (countOfLoses[player] === 1) {
      playedButOneLoss.push(player)
    }
  }
  return [playedButNoLosses.sort((a, b) => a - b), playedButOneLoss.sort((a, b) => a - b)]
};

const tests = [
  { args: [[[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [4, 9], [10, 4], [10, 9]]], out: [[1, 2, 10], [4, 5, 7, 8]] },
  { args: [[[2, 3], [1, 3], [5, 4], [6, 4]]], out: [[1, 2, 5, 6], []] },
];

tests.forEach((t, i) => {
  let res = findWinners(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});