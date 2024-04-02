/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  return s.split(" ").filter(w => w.length > 0).pop().length
};

const tests = [
  { args: ["Hello World"], out: 5 },
  { args: ["   fly me   to   the moon  "], out: 4 },
  { args: ["luffy is still joyboy"], out: 6 },
];

tests.forEach((t, i) => {
  let res = lengthOfLastWord(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});