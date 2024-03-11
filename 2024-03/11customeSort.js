/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
// var customSortString = function (order, s) {
//   let pos = Array(256).fill(26), i = 0
//   // const lowerA = "a".charCodeAt(0)
//   for (let c of order) { pos[c.charCodeAt(0)] = i++ }
//   // console.log(pos)
//   return [...s].sort((a, b) => pos[a.charCodeAt(0)] - pos[b.charCodeAt(0)]).join("")
// };

// Somehow, this was faster. Got 100% on one run
var customSortString = function (order, s) {
  let pos = Array(26).fill(26), i = 0
  const lowerA = "a".charCodeAt(0)
  for (let c of order) { pos[c.charCodeAt(0) - lowerA] = i++ }
  // console.log(pos)
  return [...s].sort((a, b) => pos[a.charCodeAt(0) - lowerA] - pos[b.charCodeAt(0) - lowerA]).join("")
};

// beat 98%
var customSortString = function (order, s) {
  const lowerA = "a".charCodeAt(0)
  let freq = Array(26).fill(0)
  for (let c of s) {
    freq[c.charCodeAt(0) - lowerA]++
  }
  let out = ""
  for (let c of order) {
    out += Array(freq[c.charCodeAt(0) - lowerA]).fill(c).join("")
    freq[c.charCodeAt(0) - lowerA] = 0
  }
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) { out += Array(freq[i]).fill(String.fromCharCode(i + lowerA)).join("") }
  }
  return out
};



const tests = [
  { args: ["cba", "abcd"], out: "cbad" },
  { args: ["bcsfg", "abcd"], out: "bcad" },
]

tests.forEach((t, i) => {
  let res = customSortString(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});