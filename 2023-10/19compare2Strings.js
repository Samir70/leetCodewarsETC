/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
// beat about 50%
// var backspaceCompare = function (S, T) {
//   const parse = s => {
//     let arr = [];
//     for (let c of s) {
//       if (c === '#') {
//         arr.pop()
//       } else {
//         arr.push(c)
//       }
//     }
//     return arr.join('')
//   }
//   return parse(S) === parse(T)
// };

// beats 95.48%
const backspaceCompare = (s, t) => {
  let i = s.length - 1, j = t.length - 1;
  // console.log({ s, t })
  const getChar = (str, i) => {
    // console.log("getting char from", { str, i })
    if (i < 0) { return ['', -1] }
    if (str[i] !== '#') { return [str[i], i] }
    let toSkip = 0;
    while (i >= 0 && (str[i] === '#' || toSkip > 0)) {
      str[i] === '#' ? toSkip++ : toSkip--
      i--
    }
    if (i < 0 || toSkip > 0) { return ['', -1] }
    return str[i] === '#' ? getChar(str, i) : [str[i], i]
  }
  while (i >= 0 || j >= 0) {
    let [letterFromS, ii] = getChar(s, i), [letterFromT, jj] = getChar(t, j);
    i = ii; j = jj;
    // console.log({ i, letterFromS, j, letterFromT })
    if (letterFromS !== letterFromT) { return false }
    i--; j--
  }
  return true
}

const tests = [
  { args: ["ab#c", "ad#c"], out: true },
  { args: ["ab##", "c#d#"], out: true },
  { args: ["a#c", "b"], out: false },
  { args: ["abc############c", "ab#c"], out: false },
  { args: ["abc############b", "b"], out: true },
  { args: ["bxj##tw", "bxo#j##tw"], out: true },
];

tests.forEach((t, i) => {
  // if (i !== 3) { return }
  let res = backspaceCompare(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});