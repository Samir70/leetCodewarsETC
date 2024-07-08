/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  let inGame = [...Array(n).keys()]
  let pointer = 0, round = 1
  while (round < n) {
    round++
    pointer = (pointer + k - 1) % inGame.length
    inGame.splice(pointer, 1)
    // console.log(inGame)
  }
  return inGame[0] + 1
};

const tests = [
  { args: [5, 2], out: 3 },
  { args: [6, 5], out: 1 },
  { args: [500, 499], out: 121 },
  { args: [500, 38], out: 381 },
];

tests.forEach((t, i) => {
  let res = findTheWinner(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});