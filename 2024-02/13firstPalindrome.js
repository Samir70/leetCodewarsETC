/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  const isPal = s => {
    let left = 0, right = s.length - 1
    while (left < right) {
      if (s[left] !== s[right]) { return false }
      left++;
      right--
    }
    return true
  }
  for (let word of words) {
    if (isPal(word)) { return word }
  }
  return ""
};

const tests = [
  { args: [["abc", "car", "ada", "racecar", "cool"]], out: "ada" },
  { args: [["notapalindrome", "racecar"]], out: "racecar" },
  { args: [["def", "ghi"]], out: "" },
  { args: [["po", "zsz"]], out: "zsz" },
];

tests.forEach((t, i) => {
  let res = firstPalindrome(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});