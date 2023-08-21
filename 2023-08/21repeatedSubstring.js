/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  // let subString = ''
  // for (let c of s) {
  //   if (c === subString[0] && s.length % subString.length === 0) {
  //     let reps = s.length / subString.length
  //     let newString = [...Array(reps)].map(x => subString).join("")
  //     console.log({ subString, reps, newString })
  //     if (newString === s) { return true }
  //   }
  //   subString += c
  // }
  // return false
  let double = (s + s)
  double = double.slice(1, double.length - 1)
  // console.log(double)
  return double.includes(s)
  // Look up KMP
};

const tests = [
  { args: ["abab"], out: true },
  { args: ["aba"], out: false },
  { args: ["abcabcabcabc"], out: true },
];

tests.forEach((t, i) => {
  let res = repeatedSubstringPattern(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});