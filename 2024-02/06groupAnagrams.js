/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const sortLetters = s => [...s].sort().join("")
  let out = []
  let sigIndex = {}
  for (let s of strs) {
    let sig = sortLetters(s)
    if (sigIndex[sig] === undefined) {
      sigIndex[sig] = out.length
      out.push([s])
    } else {
      out[sigIndex[sig]].push(s)
    }
  }
  return out
};

const tests = [
  { args: [["eat", "tea", "tan", "ate", "nat", "bat"]], out: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] },
  { args: [[""]], out: [[""]] },
  { args: [["a"]], out: [["a"]] },
];

tests.forEach((t, i) => {
  let res = groupAnagrams(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});