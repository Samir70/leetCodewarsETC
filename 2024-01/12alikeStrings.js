/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
  const countVowels = w => (w.match(/[aeiou]/gi) || []).length
  let n = s.length;
  let a = s.slice(0, n / 2), b = s.slice(n / 2);
  // console.log({ a, b })
  return countVowels(a) === countVowels(b)
};

const tests = [
  { args: ["book"], out: true },
  { args: ["bxcvmnbv"], out: true },
  { args: ["textbook"], out: false },
  { args: ["teExtbook"], out: true },
];

tests.forEach((t, i) => {
  let res = halvesAreAlike(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});