/**
 * @param {number[]} deck
 * @return {number[]}
 * https://leetcode.com/problems/reveal-cards-in-increasing-order
 */
// obv brute force beats 84%
var deckRevealedIncreasing = function (deck) {
  let out = Array(deck.length).fill(false)
  deck.sort((a, b) => a - b)
  let pointer = 0
  out[0] = deck[0]
  const advPointer = () => pointer = (pointer + 1) % deck.length
  for (let i = 1; i < deck.length; i++) {
    while (out[pointer] !== false) { advPointer() }
    advPointer()
    while (out[pointer] !== false) { advPointer() }
    out[pointer] = deck[i]
  }
  return out
};

const tests = [
  { args: [[17, 13, 11, 2, 3, 5, 7]], out: [2, 13, 3, 11, 5, 17, 7] },
  { args: [[1, 1000]], out: [1, 1000] },
];

tests.forEach((t, i) => {
  let res = deckRevealedIncreasing(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});