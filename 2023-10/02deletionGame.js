/**
 * @param {string} colors
 * @return {boolean}
 */
var winnerOfGame = function (colors) {
  let aMoves = 0, bMoves = 0;
  let cur = colors[0], count = 0;
  for (let c of colors) {
    if (c === cur) {
      count++;
    } else {
      cur = c
      count = 1
    }
    if (count > 2) {
      cur === 'A' ? aMoves++ : bMoves++
    }
    // console.log({c, cur, count, aMoves, bMoves})
  }
  // console.log({colors, aMoves, bMoves})
  return aMoves > bMoves
};

const tests = [
  { args: ["AAABABB"], out: true },
  { args: ["AA"], out: false },
  { args: ["ABBBBBBBAAA"], out: false },
];

tests.forEach((t, i) => {
  let res = winnerOfGame(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});