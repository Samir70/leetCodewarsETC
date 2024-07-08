/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  let inGame = Array(n + 1).fill(true)
  let pointer = 0
  const nextPlayer = p => {
    let next = p + 1
    if (next > n) { next -= n }
    return inGame[next] ? next : nextPlayer(next)
  }
  for (let round = 1; round < n; round++) {
    for (let i = 0; i < k; i++) {
      pointer = nextPlayer(pointer)
    }
    inGame[pointer] = false
    // console.log({ pointer, inGame })
  }
  for (let i = 1; i <= n; i++) {
    if (inGame[i]) { return i }
  }
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