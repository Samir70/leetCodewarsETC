/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  let aUptoI = [], aCount = 0
  let bUptoI = [], bCount = 0
  for (let c of s) {
    c === "a" ? aCount++ : bCount++
    aUptoI.push(aCount)
    bUptoI.push(bCount)
  }
  // console.log({ aUptoI, bUptoI })
  const a2Right = i => aCount - aUptoI[i]
  const b2left = i => i === 0 ? 0 : bUptoI[i - 1]
  let minDels = Infinity;
  for (let i = 0; i < s.length; i++) {
    minDels = Math.min(minDels, a2Right(i) + b2left(i))
  }
  return minDels
};

const tests = [
  { args: ["aababbab"], out: 2 },
  { args: ["bbaaaaabb"], out: 2 },
  { args: ["aaaaabaaabbbabbbbbb"], out: 2 },
  { args: ["bbaaaaaaabbbaabababababaaaaaaaaaaaabbbaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbabbaabb"], out: 16 },
];

tests.forEach((t, i) => {
  let res = minimumDeletions(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});