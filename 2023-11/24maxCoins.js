/**
 * @param {number[]} piles
 * @return {number}
 */
const maxCoins = piles =>
  piles.sort((a, b) => a - b)
    .slice(piles.length / 3)
    .filter((a, i) => i % 2 === 0)
    .reduce((a, c) => a + c, 0)

const tests = [
  { args: [[2, 4, 1, 2, 7, 8]], out: 9 },
  { args: [[2, 4, 5]], out: 4 },
  { args: [[9, 8, 7, 6, 5, 1, 2, 3, 4]], out: 18 },
];

tests.forEach((t, i) => {
  let res = maxCoins(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});