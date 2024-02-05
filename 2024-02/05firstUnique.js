/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const uniqueOccuranceAt = {}
  for (let i = 0; i < s.length; i++) {
    uniqueOccuranceAt[s[i]] = uniqueOccuranceAt[s[i]] === undefined ? i : -1
  }
  for (let c of s) {
    if (uniqueOccuranceAt[c] !== -1) { return uniqueOccuranceAt[c] }
  }
  return -1
};
// var firstUniqChar = function (s) {
//   for (var i = 0; i < s.length; i++) {
//     if (s.lastIndexOf(s[i]) === s.indexOf(s[i])) { return i }
//   }
//   return -1
// };

const tests = [
  { args: ["leetcode"], out: 0 },
  { args: ["loveleetcode"], out: 2 },
  { args: ["aabb"], out: -1 },
];

tests.forEach((t, i) => {
  let res = firstUniqChar(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});