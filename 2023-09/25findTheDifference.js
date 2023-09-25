/**
 * @param {string} s
 * @param {string} t 
 * @return {character}
 * t is made from rearranging s and then adding one extra character
 */
var findTheDifference = function (s, t) {
  var nums = [...(s + t)].map(x => x.charCodeAt(0))
  var out = 0
  for (var n of nums) { out ^= n }
  return String.fromCharCode(out)
};

const tests = [
  { args: ["abcd", "abcde"], out: e },
  { args: ["", "y"], out: y },
];

tests.forEach((t, i) => {
  let res = findTheDifference(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});