/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2) {
  if (sentence1 === sentence2) { return true }
  let s1 = sentence1.split(' '), s2 = sentence2.split(' ')
  if (s1.length > s2.length) {
    let temp = [...s1]
    s1 = [...s2]
    s2 = [...temp]
  }
  let len1 = s1.length, len2 = s2.length;
  let [left, r1, r2] = [0, s1.length - 1, s2.length - 1];
  while (s1[left] === s2[left] && left < len1) { left++ }
  left--
  while (s1[r1] === s2[r2] && r1 >= 0) { r1--; r2-- }
  // console.log({ s1, s2, left, r1, r2 })
  if (r1 <= left || r1 < 0) { return true }
  left++
  let nextWord = s1[left]
  let ins = []
  while (s2[left] !== nextWord && left < len2) {
    ins.push(s2[left]);
    s1.unshift('')
    left++
  }
  // console.log({ ins, s1, left })
  while (s1[left] === s2[left] && left < len2) { left++ }
  return left === len2 && s1.length === s2.length
};

const tests = [
  { args: ["A a a a A A A", "A A a a a"], out: false },
  { args: ["A B C X X A B C", "A B C"], out: true },
  { args: ["A B X X A B C", "A B C"], out: true },
  { args: ["A B X X A B C", "A B D"], out: false },
  { args: ["A B C D B B", "A B B"], out: true },
  { args: ["z z z z", "zz z"], out: false },
  { args: ["A a a", "Aa a"], out: false },
  { args: ["hello racecar", "hello racecar acecar"], out: true },
  { args: ["A B C D B B", "A B B"], out: true },
  { args: ["hello", "hr uyello"], out: false },
  { args: ["DN PD", "D"], out: false },
  { args: ["a b c", "x y z a b c"], out: true },
  { args: ["A", "a A b A"], out: true },
];

let keepGoing = true
tests.forEach((t, i) => {
  if (!keepGoing) { return }
  let res = areSentencesSimilar(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
    keepGoing = false
  } else {
    console.log('test', i, 'was correct!')
  }
});