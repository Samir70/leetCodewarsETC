/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  let lastSeenAt = {}
  for (let i = 0; i < s.length; i++) { lastSeenAt[s[i]] = i }
  let stack = [s[0]], seen = new Set()
  seen.add(s[0])
  for (let i = 1; i < s.length; i++) {
    let cur = s[i]
    if (seen.has(cur)) {
      continue
    } else {
      let last = stack[stack.length - 1]
      while (last > cur && lastSeenAt[last] > i) {
        stack.pop()
        seen.delete(last)
        last = stack.length === 0 ? 'a' : stack[stack.length - 1]
      }
      stack.push(cur)
      seen.add(cur)
    }
  }
  return stack.join('')
};

const tests = [
  { args: ["bcabc"], out: "abc" },
  { args: ["bcab"], out: "bca" },
  { args: ["cbacdcbc"], out: "acdb" },
  { args: ["sdhfgjdhgueryotiuqweyrqwghjgsadfjasdjfahlskjblkjvndsjfhadskjfglaksjdghfalsgfwieuryqoiwuyaoysiduafygadsfkghsdfkjghsdurtyieu"], out: "abjvndfghleqiwoksrtyu" },
];

tests.forEach((t, i) => {
  let res = removeDuplicateLetters(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});