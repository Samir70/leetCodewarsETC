/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
  let ts = 0, fs = 0;
  let left = 0, right = 0;
  let ans = 0;
  while (right < answerKey.length) {
    answerKey[right] === "T" ? ts++ : fs++
    if (ts <= k || fs <= k) { 
      ans = Math.max(ans, ts + fs) 
    } else {
      while (ts > k && fs > k) {
        answerKey[left] === "T" ? ts-- : fs--
        left++
      }
    }
    // console.log({left, right, ans})
    right++
  }
  return ans
};

const tests = [
  { args: ["TTFF", 2], out: 4 },
  { args: ["TFFT", 1], out: 3 },
  { args: ["TTFTTFTT", 1], out: 5 },
  { args: ["TTTTFFFFTTTTFTT", 2], out: 8 },
]

tests.forEach((t, i) => {
  let res = maxConsecutiveAnswers(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});