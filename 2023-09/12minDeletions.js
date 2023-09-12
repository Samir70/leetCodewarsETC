/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
  let count = {}
  for (let c of s) {
    count[c] = (count[c] || 0) + 1
  }
  let freqs = Object.values(count).sort((a, b) => a - b)
  // console.log(freqs)
  let seenFreq = new Set(), deletions = 0;
  for (let freq of freqs) {
    let cur = freq
    while (seenFreq.has(cur) && cur > 0) {
      cur--; deletions++;
    }
    seenFreq.add(cur)
  }
  return deletions
};

const tests = [
  { args: ["aab"], out: 0 },
  { args: ["aaabbbcc"], out: 2 },
  { args: ["ceabaacb"], out: 2 },
  { args: ["aslkdfghlkjadfhgliuearhtiueyrkhbfsldkjshdlkfjghfdfsgjahdslkfjghaeiruiuyoiysdghasdkljhxcnvcxvbnkdjfshglskdhgieurtyoisudryoidfuhgisdhfkgjhdskfjghldkfjgheriugtodsiudfhgjsdhlfkjghlkjdghkjfffffffffffffffffffffgjhhhhhhhhgssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssjfsdhglkjdfshgkjfshldkjfg"], out: 18 },
];

tests.forEach((t, i) => {
  let res = minDeletions(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});