// const countConsistentStrings = (allowed, words) => {
//   let hash = new Map()
//   for (let a of allowed) { hash.set(a, true) }
//   let count = 0;
//   for (let w of words) {
//     if ([...w].every(x => hash.get(x))) { count++ }
//   }
//   return count
// };

// a little faster
const countConsistentStrings = (allowed, words) => {
  let hash = new Map()
  for (let a of allowed) { hash.set(a, true) }
  let count = words.length;
  for (let w of words) {
    for (let c of w) {
      if (!hash.get(c)) { count--; break }
    }
  }
  return count
};

const tests = [
  { args: ["ab", ["ad", "bd", "aaab", "baa", "badab"]], out: 2 },
  { args: ["abc", ["a", "b", "c", "ab", "ac", "bc", "abc"]], out: 7 },
  { args: ["cad", ["cc", "acd", "b", "ba", "bac", "bad", "ac", "d"]], out: 4 },
];

tests.forEach((t, i) => {
  let res = countConsistentStrings(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});