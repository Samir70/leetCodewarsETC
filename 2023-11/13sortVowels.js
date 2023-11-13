/**
 * @param {string} s
 * @return {string}
 * gives string with vowels sorted by ASCII code, so capitals first
 */
const vowels = {}
let vList = [..."AEIOUaeiou"]
vList.forEach((e, i) => {
  vowels[e] = i
});
// console.log(vowels)
var sortVowels = function (s) {
  let vs = s.match(/[AEIOU]/gi)
  // console.log(vs)
  if (vs === null) { return s }
  vs = vs.sort((a, b) => vowels[a] - vowels[b])
  let ans = "", pointer = 0
  for (let letter of s) {
    if (vowels[letter] === undefined) {
      ans += letter
    } else {
      ans += vs[pointer++]
    }
  }
  return ans
};

const tests = [
  { args: ["lEetcOde"], out: "lEOtcede" },
  { args: ["lYmpH"], out: "lYmpH" },
];

tests.forEach((t, i) => {
  let res = sortVowels(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});