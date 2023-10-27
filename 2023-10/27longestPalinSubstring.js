/**
 * @param {string} s
 * @return {string}
 * return longest palindromic substring
 */
// beat 53% on speed
var longestPalindrome = function (s) {
  let bestPal = s[0]
  for (let i = 0; i < s.length; i++) {
    let left = i - 1, right = i + 1;
    while (left >= 0 && right < s.length) {
      let centeredAtI = s[left] === s[right] ? s.substring(left, right + 1) : ""
      if (centeredAtI === "") { break }
      if (centeredAtI.length > bestPal.length) { bestPal = centeredAtI }
      left--; right++
      // console.log({ bestPal, centeredAtI })
    }
    left = i, right = i + 1;
    while (left >= 0 && right < s.length) {
      let evenLength = s[left] === s[right] ? s.substring(left, right + 1) : ""
      if (evenLength === "") { break }
      if (evenLength.length > bestPal.length) { bestPal = evenLength }
      left--; right++
      // console.log({ bestPal, evenLength })
    }
  }
  return bestPal
};

const tests = [
  { args: ["babad"], out: "bab" }, // or aba
  { args: ["cbbd"], out: "bb" },
  { args: ["asdsaabcdefgfedcbassdfasd"], out: "abcdefgfedcba" },
  { args: ["asdsaabcdefggfedcbassdfasd"], out: "abcdefggfedcba" },
  { args: ["asdsaabcdefgggfedcbassdfasd"], out: "abcdefgggfedcba" },
  { args: ["absdxysadnmabcdefdsgasfdhjgfedcbashjgsdfakfjdsl7d"], out: "a" },
];

tests.forEach((t, i) => {
  let res = longestPalindrome(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});