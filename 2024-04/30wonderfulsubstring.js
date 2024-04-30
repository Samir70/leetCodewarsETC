/**
 * @param {string} word
 * @return {number}
 */
const charVal = c => 1 << (c.charCodeAt(0) - "a".charCodeAt(0))
var wonderfulSubstrings = function (word) {
  let freqCount = { 0: 1 }
  let oddFlags = 0, ans = 0
  // keep a bitwise indicator of which chars have appeared an odd number of time
  // from the start of the word
  // By keeping a log of how frequent each value is, 
  // we can quickly count up the substrings where 
  // every char appears an even number of times
  for (let c of word) {
    let curVal = charVal(c)
    oddFlags ^= curVal
    ans += (freqCount[oddFlags] || 0) // all-even substrings
    freqCount[oddFlags] = (freqCount[oddFlags] || 0) + 1
    // exactly one odd substrings
    for (let i = 0; i < 10; i++) {
      let maskXchar = oddFlags ^ (1 << i)
      ans += freqCount[maskXchar] || 0
    }
  }
  // console.log(freqCount, ans)
  return ans
};

const tests = [
  { args: ["aba"], out: 4 },
  { args: ["aabb"], out: 9 },
  { args: ["aabbacaacaaa"], out: 57 },
  { args: ["he"], out: 2 },
];

// console.log([..."abcdefghij"].map(c => charVal(c)))

tests.forEach((t, i) => {
  let res = wonderfulSubstrings(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});