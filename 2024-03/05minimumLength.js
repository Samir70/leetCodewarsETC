/**
 * deleted any positive number of the same letter from both ends, over and over. 
 * What is length of the string that is left?
 * @param {*} s : string
 */

var minimumLength = function (s) {
  if (s.length === 1) { return 1 }
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return right - left + 1
    }
    let c = s[left]
    while (left < right && s[left] === c) { left++ }
    while (right > left && s[right] === c) {
      right--;
      if (right === left) { return 1 }
    }
  }
  return 0
};

const tests = [
  { args: ["ca"], out: 2 },
  { args: ["a"], out: 1 },
  { args: ["cabaabac"], out: 0 },
  { args: ["aabccabba"], out: 3 },
  { args: ["bbbbbbbbbbbbbbbbbbbbbbbbbbbabbbbbbbbbbbbbbbccbcbcbccbbabbb"], out: 1 }
];

tests.forEach((t, i) => {
  let res = minimumLength(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});