/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const findScore = (str, target) => {
  let stack = []
  for (let c of str) {
    if (c !== target[1]) {
      stack.push(c)
    } else if (stack[stack.length - 1] === target[0]) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }
  return stack.join("")
}

const maximumGain = (s, x, y) => {
  let score = 0
  if (x >= y) {
    let leftOver = findScore(s, "ab")
    let pairs = ((s.length - leftOver.length) / 2)
    score += x * pairs
    // console.log({ leftOver, score, pairs })
    leftOver = findScore(leftOver, "ba")
    pairs = ((s.length - leftOver.length) / 2) - pairs
    score += y * pairs
    // console.log({ leftOver, score, pairs })
  } else {
    let leftOver = findScore(s, "ba")
    let pairs = ((s.length - leftOver.length) / 2)
    score += y * pairs
    // console.log({ leftOver, score, pairs })
    leftOver = findScore(leftOver, "ab")
    pairs = ((s.length - leftOver.length) / 2) - pairs
    score += x * pairs
    // console.log({ leftOver, score, pairs })
  }
  return score
}

const tests = [
  { args: ["cdbcbbaaabab", 4, 5], out: 19 },
  { args: ["aabbaaxybbaabb", 5, 4], out: 20 },
  {
    args: [
      "aabbrtababbabmaaaeaabeawmvaataabnaabbaaaybbbaabbabbbjpjaabbtabbxaaavsmmnblbbabaeuasvababjbbabbabbasxbbtgbrbbajeabbbfbarbagha", 8484, 4096],
    out: 198644
  },
];

tests.forEach((t, i) => {
  let res = maximumGain(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});