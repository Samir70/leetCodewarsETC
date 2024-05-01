/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
  let i = word.indexOf(ch)
  if (i === -1) { return word }
  return [...word.slice(0, i + 1)].reverse().join("") + word.slice(i + 1)
};

const tests = [
  { args: ["abcdefd", "d"], out: "dcbaefd" },
  { args: ["xyxzxe", "z"], out: "zxyxxe" },
  { args: ["abcd", "z"], out: "abcd" },
  { args: ["abcd", "d"], out: "dcba" },
];

tests.forEach((t, i) => {
  let res = reversePrefix(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});