/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLengthOfOptimalCompression = function (s, k) {
  let memo = {}
  const helper = (start, lastChar, lastCount, remainingDels) => {
    const key = [start, lastChar, lastCount, remainingDels].join("-")
    if (memo[key] !== undefined) {return memo[key]}
    let ans
    if (remainingDels < 0) {
      ans = Infinity
    } else if (start >= s.length) {
      ans = 0
    } else if (s[start] === lastChar) {
      // how much does it cost to add one more char to our string?
      let extraCost = lastCount === 1 || lastCount === 9 || lastCount===99 ? 1 : 0
      ans =  extraCost + helper(start + 1, lastChar, lastCount + 1, remainingDels)
    } else {
      let keepChar = 1 + helper(start + 1, s[start], 1, remainingDels)
      let delChar = helper(start + 1, lastChar, lastCount, remainingDels - 1)
      ans = Math.min(keepChar, delChar)
    }
    memo[key] = ans
    return ans
  }
  return helper(0, "", 0, k)
};

const tests = [
  { args: ["aaabcccd", 2], out: 4 },
  { args: ["aabbaa", 2], out: 2 },
  { args: ["aaaaaaaaaaa", 0], out: 3 },
  { args: ["aaaaaaaaaaaaaaaaaaaaaa", 13], out: 2 },
  { args: ["vsjpvmilhatpehodqivnaolnieiktvsjsekgujarvnotnthl", 13], out: 34 },
  {
    args: ["aaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaaaaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaa", 50],
    out: 3
  },
  {
    args: ["aaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaaaaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaa", 9],
    out: 13
  }
];

tests.forEach((t, i) => {
  let res = getLengthOfOptimalCompression(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});