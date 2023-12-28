/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const compress = str => {
  let blocks = str.match(/(.)\1*/g)
  // console.log(blocks)
  return blocks.map(b => [b[0], b.length])
}
const comp2fullStr = comp => comp.map(c => Array(c[1]).fill(c[0]).join("")).join("")

const comp2str = c => compress(comp2fullStr(c)).map(b => b[0] + (b[1] === 1 ? "" : b[1])).join("")
var getLengthOfOptimalCompression = function (s, k) {
  const memo = {}
  let comp = compress(s)
  // console.log(comp)
  const helper = (comp, k) => {
    if (k < 0) { return Infinity }
    let min = comp2str(comp).length
    let key = comp2str(comp) + "-" + k
    if (memo[key] !== undefined) { return memo[key] }
    if (k === 0) { return min }
    /**
      we only have 4 options to reduce the length:
          a: remove 1 char
          a8: remove 7 or 8 chars
          a20: 11, 19 or 20 chars
          a100: 1, 91, 99 or 100
     */
    for (let i = 0; i < comp.length; i++) {
      let [char, num] = comp[i]
      let [opt1, opt2, opt3, opt4] = [min, min, min, min]
      if (num === 1) {
        let newComp = [...comp.slice(0, i), ...comp.slice(i + 1)]
        opt1 = helper(newComp, k - 1)
      } else if (num < 10) {
        let newComp = [...comp]
        newComp[i] = [char, 1]
        let leave1 = helper(newComp, k - num + 1)
        newComp = [...comp.slice(0, i), ...comp.slice(i + 1)]
        let takeAll = helper(newComp, k - num)
        opt2 = Math.min(leave1, takeAll)
      } else if (num < 100) {
        let newComp = [...comp]
        newComp[i] = [char, 9]
        let leave9 = helper(newComp, k - num + 9)
        newComp[i] = [char, 1]
        let leave1 = helper(newComp, k - num + 1)
        newComp = [...comp.slice(0, i), ...comp.slice(i + 1)]
        let takeAll = helper(newComp, k - num)
        opt2 = Math.min(leave9, leave1, takeAll)
      } else {
        // num === 100, s is just one char
        if (k === 0) {
          return 4
        } else if (91 <= k && k < 99) {
          return 3
        } else if (k === 99) {
          return 2
        } else {
          return 1
        }
      }
      min = Math.min(min, opt1, opt2, opt3, opt4)
    }
    memo[key] = min
    return min
  }
  return helper(comp, k)
};

const tests = [
  { args: ["aaabcccd", 2], out: 4, out2: "a3bc3d" },
  { args: ["aabbaa", 2], out: 2, out2: "a2b2a2" },
  { args: ["aaaaaaaaaaa", 0], out: 3, out2: "a11" },
  { args: ["aaaaaaaaaaaaaaaaaaaaaa", 13], out: 2, out2: "a22" },
  {
    args: ["aaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaaaaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaa", 50],
    out: 3,
    out2: "a11b4a11v6a22b4a11v6a11"
  },
  {
    args: ["aaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaaaaaaaaaaaaabbbbaaaaaaaaaaavvvvvvaaaaaaaaaaa", 9],
    out: 13,
    out2: "a11b4a11v6a22b4a11v6a11"
  }
];

tests.forEach((t, i) => {
  let res = compress(...t.args);
  if (comp2str(res) !== t.out2) {
    console.log(
      'test', i, 'should be', t.out2, ' got ', res
    )
  } else {
    console.log('Compression test', i, 'was correct!')
  }
});

tests.forEach((t, i) => {
  let res = getLengthOfOptimalCompression(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});