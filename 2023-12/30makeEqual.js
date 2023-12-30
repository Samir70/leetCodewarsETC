/**
 * @param {string[]} words
 * @return {boolean}
 */
// var makeEqual = function (words) {
//   let tally = {}
//   for (let word of words) {
//     for (let c of word) {
//       tally[c] = (tally[c] || 0) + 1
//     }
//   }
//   let n = words.length
//   for (let c of Object.keys(tally)) {
//     if (tally[c] % n !== 0) {return false}
//   }
//   return true
// };
var makeEqual = function (words) {
  let tally = Array(26).fill(0)
  for (let word of words) {
    for (let c of word) {
      let i = c.charCodeAt(0) - "a".charCodeAt(0)
      tally[i]++
    }
  }
  let n = words.length
  for (let count of tally) {
    if (count % n !== 0) {return false}
  }
  return true
};

const tests = [
  { args: [["abc", "aabc", "bc"]], out: true },
  { args: [["ab", "a"]], out: false },
];

tests.forEach((t, i) => {
  let res = makeEqual(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});