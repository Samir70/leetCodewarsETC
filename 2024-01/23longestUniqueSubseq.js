const word2bits = w => {
  let out = 0
  for (let letter of w) {
    let bit = 1 << (letter.charCodeAt(0) - "a".charCodeAt(0))
    if (out & bit) { return null }
    out ^= bit
  }
  return out
}
const countBits = (n) => n === 0 ? 0 : 1 + countBits(n & (n - 1));



/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  let wordBits = []
  for (let word of arr) {
    let bits = word2bits(word)
    if (bits) { wordBits.push(bits) }
  }
  // console.log(wordBits)
  if (wordBits.length === 0) { return 0 }
  if (wordBits.length === 1) { return countBits(wordBits[0]) }
  const numbCombs = 2 ** wordBits.length
  let maxChars = 0
  for (let bitMask = 1; bitMask < numbCombs; bitMask++) {
    let bitsOfSelected = 0
    for (let bit = 0; bit < wordBits.length; bit++) {
      // console.log(1 << bit, 1 << bit & bitMask)
      if (((1 << bit) & bitMask) === 0) { continue }
      if (bitsOfSelected & wordBits[bit]) { break }
      bitsOfSelected ^= wordBits[bit]
      // console.log("added", {bit, bitMask: bitMask.toString(2), wordbits: wordBits[bit].toString(2)})
    }
    // console.log({ 
    //   numbCombs, bitMask: bitMask.toString(2), 
    //   bitsOfSelected:bitsOfSelected.toString(2), count: countBits(bitsOfSelected) })
    maxChars = Math.max(maxChars, countBits(bitsOfSelected))
  }
  return maxChars
};

let tests = [
  { args: ["a"], out: 1 },
  { args: ["b"], out: 2 },
  { args: ["ab"], out: 3 },
  { args: ["bc"], out: 6 },
  { args: ["bcc"], out: null },
]

tests.forEach((t, i) => {
  let res = word2bits(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('word2bits test', i, 'was correct!')
  }
});

tests = [
  { args: [["un", "iq", "ue"]], out: 4 },
  { args: [["unu", "iqi", "ue"]], out: 2 },
  { args: [["unu", "iqi", "uue"]], out: 0 },
  { args: [["cha", "r", "act", "ers"]], out: 6 },
  { args: [["abcdefghijklmnopqrstuvwxyz"]], out: 26 },
];

tests.forEach((t, i) => {
  let res = maxLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('maxLength test', i, 'was correct!')
  }
});