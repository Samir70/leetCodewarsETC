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
var partition = function (s) {
  if (s.length === 1) { return [[s]] }
  let out = []
  const backtrack = (start, curPart) => {
    if (start >= s.length) {
      out.push([...curPart])
      return
    }
    for (let end = start; end < s.length; end++) {
      let sub = s.slice(start, end + 1)
      // console.log({start, end, sub, curPart})
      if (isPalindrome(sub)) {
        curPart.push(sub)
        backtrack(end + 1, curPart)
        curPart.pop()
      }
    }
  }
  backtrack(0, [])
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