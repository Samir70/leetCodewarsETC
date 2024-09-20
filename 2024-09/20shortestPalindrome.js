/**
 * @param {string} s
 * @return {string}
 */
const buildPrefixTable = s => {
  // KMP algorithm
  let prefix = Array(s.length).fill(0)
  let length = 0
  for (let i = 1; i < s.length; i++) {
    while (length > 0 && s[i] !== s[length]) {
      length = prefix[length - 1]
    }
    if (s[i] === s[length]) {
      length++
    }
    prefix[i] = length
  }
  return prefix
}
var shortestPalindrome = function (s) {
  if (s.length < 2) { return s }
  let rev = [...s].reverse().join("")
  let combi = s + "#" + rev
  let prefix = buildPrefixTable(combi)
  let i = prefix[prefix.length - 1]
  let head = s.slice(0, i)
  let tail = s.slice(i)
  let revTail = [...tail].reverse().join("")
  // console.log({ s, i, head, tail })
  return revTail + s
};

const tests = [
  { args: ["aacecaaa"], out: "aaacecaaa" },
  { args: ["aacecaa"], out: "aacecaa" },
  { args: ["abcd"], out: "dcbabcd" },
  { args: ["aabba"], out: "abbaabba" },
  { args: ["abb"], out: "bbabb" },
  { args: ["b"], out: "b" },
  { args: [""], out: "" },
  { args: ["aaaaaaaaaaaaaaaaaaaaaaaa"], out: "aaaaaaaaaaaaaaaaaaaaaaaa" },
];

tests.forEach((t, i) => {
  let res = shortestPalindrome(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});