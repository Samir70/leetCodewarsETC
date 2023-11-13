/**
 * @param {string} s
 * @return {string}
 * gives string with vowels sorted by ASCII code, so capitals first
 */
const sortedVowels = "AEIOUaeiou"
// using counting sort is faster since string length is far greater than 10
var sortVowels = function (s) {
  let counter = {}
  for (let v of sortedVowels) { counter[v] = 0 }
  for (let letter of s) {
    if (counter[letter] === undefined) { continue }
    counter[letter]++
  }
  let vowelsOfS = ''
  for (let v of sortedVowels) {
    vowelsOfS += Array(counter[v]).fill(v).join("")
  }
  // console.log({counter, vowelsOfS})
  let ans = '', pointer = 0;
  for (let letter of s) {
    if (counter[letter]) {
      ans += vowelsOfS[pointer++]
    } else {
      ans += letter
    }
  }
  return ans
};

const tests = [
  { args: ["lEetcOde"], out: "lEOtcede" },
  { args: ["lYmpH"], out: "lYmpH" },
];

tests.forEach((t, i) => {
  let res = sortVowels(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});