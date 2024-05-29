/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function (s) {
  let count = 0
  let right = s.length - 1
  while (right > 0 && s[right] === "0") {
    count++; right--
  }
  let arr = [...s]
  if (right === 0) { return count }
  count++
  while (right > 0) {
    let oneCount = 0
    while (right > 0 && arr[right] === "1") {
      oneCount++
      right--
    }
    count += oneCount + 1
    arr[right] = "1"
  }
  return count
};

const tests = [
  { args: ["1101"], out: 6 },
  { args: ["110111"], out: 8 },
  { args: ["1100111"], out: 10 },
  { args: ["1100111000"], out: 13 },
  { args: ["10"], out: 1 },
  { args: ["1"], out: 0 },
];

tests.forEach((t, i) => {
  let res = numSteps(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});