/**
 * @param {string} s
 * @return {string}
 */
/**
 * alt: Use a heap for the counts so you can add the most frequent characters first
 * alt: fill odd and even indices
 */
var reorganizeString = function (s) {
  if (s.length === 1) { return s }
  let letterCounter = {}, max = 0, mostCommonLetter = "";
  for (let c of s) {
    letterCounter[c] = (letterCounter[c] || 0) + 1
    if (letterCounter[c] > max) {
      max = letterCounter[c];
      mostCommonLetter = c
    }
  }
  let midLength = Math.ceil(s.length / 2)
  if (max > midLength) { return "" }
  let letters = Object.keys(letterCounter).sort((a, b) => letterCounter[b] - letterCounter[a])
  let ordered = ""
  for (let c of letters) {
    ordered += Array(letterCounter[c]).fill(c).join("")
  }
  let left = ordered.slice(0, midLength), right = ordered.slice(midLength)
  // console.log({ordered, left, right});
  let out = ""
  for (let i = 0; i < left.length; i++) {
    out += left[i] + (right[i] || "")
  }
  return out
};

const tests = [
  { args: ["aab"], out: "aba" },
  { args: ["aaab"], out: "" },
  { args: ["aaabc"], out: "abaca" },
  { args: ["baaba"], out: "ababa" },
  { args: ["blflxll"], out: "lblflxl" },
];

tests.forEach((t, i) => {
  let res = reorganizeString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});

/**
  let left = 1
  s = [...s]
  if (s[0] !== mostCommonLetter) {
    let right = 1;
    while (s[right] !== mostCommonLetter) { right++ }
    s[right] = s[0];
    s[0] = mostCommonLetter;
  }
  while (left < s.length) {
    let right = left
    while (right < s.length && s[left - 1] === s[right]) { right++ }
    // console.log({left, right, s:s.join("")})
    if (right >= s.length) { return "" }
    let temp = s[left]
    s[left] = s[right]
    s[right] = temp
    left++
  }
 */