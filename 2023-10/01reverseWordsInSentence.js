/**
 * @param {string} s
 * @return {string}
 */
const reverseWord = w => [...w].reverse().join('')
const reverseWords = s => s.split(' ').map(reverseWord).join(' ')

const tests = [
  { args: ["Let's take LeetCode contest"], out: "s'teL ekat edoCteeL tsetnoc" },
  { args: ["God Ding"], out: "doG gniD" },
];

tests.forEach((t, i) => {
  let res = reverseWords(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});