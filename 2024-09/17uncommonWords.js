/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  let out = []
  let seen = new Set(), common = new Set()
  words = [...s1.split(" "), ...s2.split(" ")]
  for (let w of words) {
    seen.has(w) ? common.add(w) : seen.add(w)
  }
  for (let w of words) {
    if (!common.has(w)) { out.push(w) }
  }
  return out
};
// var uncommonFromSentences = function (s1, s2) {
//   let out = []
//   let tally = {}
//   words = [...s1.split(" "), ...s2.split(" ")]
//   for (let w of words) {
//     tally[w] = (tally[w] || 0) + 1
//   }
//   for (let w of words) {
//     if (tally[w] === 1) {out.push(w)}
//   }
//   return out
// };

const tests = [
  { args: ["this apple is sweet", "this apple is sour"], out: ["sweet", "sour"] },
  { args: ["apple apple", "banana"], out: ["banana"] },
  { args: ["apple apple banana", "banana"], out: [] },
  { args: ["all are uncommon", "none used twice"], out: ['all', 'are', 'uncommon', 'none', 'used', 'twice'] },
];

tests.forEach((t, i) => {
  let res = uncommonFromSentences(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});