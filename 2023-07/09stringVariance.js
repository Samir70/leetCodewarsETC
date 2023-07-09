/**
 * @param {string} s
 * @return {number}
 */
const variance = (str, major, minor, restMinor) => {
  let [globalMax, majorCount, minorCount] = [0, 0, 0];
  for (let ch of str) {
    if (ch === major) { majorCount++ }
    if (ch === minor) { minorCount++; restMinor-- }
    if (minorCount > 0) {
      globalMax = Math.max(globalMax, majorCount - minorCount)
    }
    if (majorCount - minorCount < 0 && restMinor > 0) {
      majorCount = 0;
      minorCount = 0;
    }
  }
  return globalMax
}
var largestVariance = function (s) {
  const counter = {}
  for (let c of s) {
    counter[c] = (counter[c] || 0) + 1
  }
  let chars = Object.keys(counter)
  let maxVar = 0;
  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars.length; j++) {
      if (i === j) { continue }
      let major = chars[i], minor = chars[j]
      maxVar = Math.max(maxVar, variance(s, major, minor, counter[minor]))
      // console.log({ major, minor, maxVar })
    }
  }
  return maxVar
};

const tests = [
  { args: ["aababbb"], out: 3 },
  { args: ["abcde"], out: 0 },
];

tests.forEach((t, i) => {
  let res = largestVariance(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});