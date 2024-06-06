/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
// var isPossibleDivide = function(hand, groupsize) {
var isNStraightHand = function (hand, groupSize) {
  if (hand.length % groupSize) { return false }
  if (groupSize === 1) { return true }
  let tally = {}, lowest = Infinity, highest = 0
  for (let h of hand) {
    tally[h] = (tally[h] || 0) + 1
    if (h < lowest) { lowest = h }
    if (h > highest) { highest = h }
  }
  if (lowest === highest) { return false }
  // console.log(tally, lowest, highest)
  while (lowest < highest) {
    for (let i = 0; i < groupSize; i++) {
      if (!tally[lowest + i]) { return false }
      tally[lowest + i]--
    }
    while (!tally[lowest] && lowest < highest) { lowest++ }
    // console.log(tally, lowest, highest)
    if (lowest === highest && tally[lowest]) { return false }
  }
  return true
};

const tests = [
  { args: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], out: true },
  { args: [[1, 2, 3, 4, 5], 4], out: false },
  { args: [[1, 2, 3, 3, 4, 4, 5, 6], 4], out: true },
  { args: [[3, 2, 1, 2, 3, 4, 3, 4, 5, 9, 10, 11], 3], out: true },
  { args: [[1, 1, 2, 2, 3, 3], 2], out: false },
  { args: [[1, 2, 3], 1], out: true },
  { args: [[0, 0], 2], out: false },
];

tests.forEach((t, i) => {
  let res = isNStraightHand(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});