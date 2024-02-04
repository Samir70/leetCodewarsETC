/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let tTally = {}
  for (let c of t) {
    tTally[c] = (tTally[c] || 0) + 1
  }
  let leftTally = {}, rightTally = {}
  const foundAll = () => {
    for (let k in tTally) {
      let foundInWindow = (rightTally[k] || 0) - (leftTally[k] || 0)
      if (tTally[k] > foundInWindow) { return false }
    }
    return true
  }
  let left = 0, right = 0;
  let minStr = ""
  while (right < s.length) {
    let c = s[right]
    rightTally[c] = (rightTally[c] || 0) + 1
    right++
    // console.log({ c, f: foundAll(), rightTally, leftTally, tTally })
    if (foundAll()) {
      while (foundAll() && left < right) {
        let possAns = s.slice(left, right)
        // console.log({ possAns, minStr })
        if (minStr === "" || possAns.length < minStr.length) {
          minStr = possAns
        }
        let c2 = s[left]
        leftTally[c2] = (leftTally[c2] || 0) + 1
        left++
      }
    }
  }
  return minStr
};

const tests = [
  { args: ["ADOBECODEBANC", "ABC"], out: "BANC" },
  { args: ["a", "a"], out: "a" },
  { args: ["ab", "a"], out: "a" },
  { args: ["a", "aa"], out: "" },
];

tests.forEach((t, i) => {
  let res = minWindow(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});