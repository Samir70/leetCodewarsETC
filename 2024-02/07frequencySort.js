// took 232ms, it sorts the input string which can be long
var frequencySortSlow = function (s) {
  var tally = {}
  for (var c of s) {
    tally[c] = (tally[c] || 0) + 1
  }
  // sorting an array made from s passed but was very slow
  return Object.keys(tally)
    .sort((a, b) => tally[b] - tally[a])
    .reduce((acc, v) => acc + v.repeat(tally[v]), '')
};
// return [...s].sort((a, b) => 
// tally[a] === tally[b] ? b.charCodeAt(0) - a.charCodeAt(0) : tally[b] - tally[a]).join('')

// sorting the tallys' keys is faster
// 88ms beats 92%
var frequencySort2 = function (s) {
  let tally = {}
  for (let c of s) {
    if (tally[c] === undefined) {
      tally[c] = 1
    } else {
      tally[c]++
    }
  }
  let sorted = Object.keys(tally).sort((a, b) => tally[b] - tally[a])
  let out = ''
  for (let c of sorted) {
    out += c.repeat(tally[c])
  }
  return out
};

// 56ms 97.97%
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  let tally = {}
  for (let c of s) {
    tally[c] = (tally[c] || 0) + 1
  }
  return Object.keys(tally).sort((a, b) => tally[b] - tally[a]).map(c => Array(tally[c]).fill(c).join('')).join('')
};

// consider ajna's
// https://leetcode.com/problems/sort-characters-by-frequency/discuss/786374/C%2B%2B-Frequency-Map-based-vs-Array-Solutions-Compared-and-Explained-~100-Time-~100-Space

const tests = [
  { args: ["tree"], out: "eetr" },
  { args: ["what happens if there's a space?"], out: "     aaaaeeeehhhpppsssttwnifr'c?" },
  // note: order of hhh and ppp is optional, 
  // would be good to have a check ans function
  // to handle cases like this.
  { args: ["aAaccc"], out: "cccaaA" }
];

tests.forEach((t, i) => {
  let res = frequencySort(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});