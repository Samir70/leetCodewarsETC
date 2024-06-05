/**
 * @param {string[]} words
 * @return {string[]}
 */
const a = "a".charCodeAt(0)
const letter = c => String.fromCharCode(c + a)
var commonChars = function (words) {
  let tally = []
  for (let word of words) {
    let t = Array(26).fill(0)
    for (let c of word) {
      t[c.charCodeAt(0) - a]++
    }
    tally.push(t)
  }
  let out = []
  for (let c = 0; c < 26; c++) {
    let min = 1000
    for (let t = 0; t < tally.length; t++) {
      if (tally[t][c] < min) { min = tally[t][c] }
    }
    // console.log({ char: letter(c), min })
    for (let i = 0; i < min; i++) {
      out.push(letter(c))
    }
  }
  return out
};

const tests = [
  { args: [["bella", "label", "roller"]], out: ["e", "l", "l"] },
  { args: [["cool", "lock", "cook"]], out: ["c", "o"] },
];

tests.forEach((t, i) => {
  let res = commonChars(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});