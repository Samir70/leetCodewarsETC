/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
  let firstSeen = Array(26).fill(null);
  const getIndex = (c) => c.charCodeAt(0) - "a".charCodeAt(0);
  let max = -1
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    let j = getIndex(c)
    if (firstSeen[j] !== null) {
      let dist = i - firstSeen[j] - 1;
      max = Math.max(max, dist)
    } else {
      firstSeen[j] = i
    }
  }
  return max
};

const tests = [
  { args: ["aa"], out: 0 },
  { args: ["abca"], out: 2 },
  { args: ["cbzxy"], out: -1 },
  { args: ["mgntdygtxrvxjnwksqhxuxtrv"], out: 18 },
];

tests.forEach((t, i) => {
  let res = maxLengthBetweenEqualCharacters(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});