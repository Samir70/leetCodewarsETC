/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
const arrayStringsAreEqual = (a, b) => a.join('') === b.join('')

const tests = [
  { args: [["ab", "c"], ["a", "bc"]], out: true },
  { args: [["a", "cb"], ["ab", "c"]], out: false },
  { args: [["abc", "d", "defg"], ["abcddefg"]], out: true },
];

tests.forEach((t, i) => {
  let res = arrayStringsAreEqual(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});