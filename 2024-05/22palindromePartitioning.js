/**
 * @param {string} s
 * @return {string[][]}
 */
var isPalindrome = function (s) {
  var start = 0, end = s.length - 1;
  while (start < end) {
    if (s[start++] !== s[end--]) { return false }
  }
  return true
};
const genSubs = s => {
  let out = []
  for (let i = 1; i <= s.length; i++) {
    out.push(s.slice(0, i))
  }
  return out
}
var partition = function (s) {
  if (s.length === 1) { return [[s]] }
  let out = []
  let subStrings = genSubs(s)
  for (let sub of subStrings) {
    if (!isPalindrome(sub)) { continue }
    let rest = s.slice(sub.length)
    if (rest === "") {
      out.push([sub])
    } else {
      let partOfRest = partition(rest)
      // console.log({ sub, rest, partOfRest })
      for (let p of partOfRest) {
        out.push([sub, ...p])
      }
    }
  }
  return out
};

const tests = [
  { args: ["aab"], out: [["a", "a", "b"], ["aa", "b"]] },
  { args: ["a"], out: [["a"]] },
  { args: ["abcba"], out: [["a", "b", "c", "b", "a"], ["a", "bcb", "a"], ["abcba"]] },
  {
    args: ["abccba"], out: [
      ["a", "b", "c", "c", "b", "a"], ["a", "b", "cc", "b", "a"],
      ["a", "bccb", "a"], ["abccba"]]
  },
];

tests.forEach((t, i) => {
  let res = partition(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});