/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
// const arrayStringsAreEqual = (a, b) => a.join('') === b.join('')
const arrayStringsAreEqual = (a, b) => {
  let left = 0, right = 0;
  let leftChar = 0, rightChar = 0;
  while (left < a.length && right < b.length) {
    while (leftChar < a[left].length && rightChar < b[right].length) {
      if (a[left][leftChar] !== b[right][rightChar]) { return false }
      leftChar++;
      rightChar++
    }
    if (leftChar === a[left].length) {
      left++;
      leftChar = 0;
    }
    if (rightChar === b[right].length) {
      right++;
      rightChar = 0;
    }
  }
  return left === a.length //&& leftChar === a[left].length
    && right === b.length //&& rightChar === a[right].length
}

const tests = [
  { args: [["ab", "c"], ["a", "bc"]], out: true },
  { args: [["a", "cb"], ["ab", "c"]], out: false },
  { args: [["abc", "d", "defg"], ["abcddefg"]], out: true },
  { args: [["abc", "d", "def"], ["abcddefg"]], out: false },
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