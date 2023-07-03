/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const buddyStrings = (s, goal) => {
  if (s.length !== goal.length) { return false }
  let diffAt = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) { diffAt.push(i) }
  }
  if (diffAt.length === 0) {
    let seen = new Set()
    for (c of s) {
      if (seen.has(c)) { return true }
      seen.add(c)
    }
    return false
  } else {
    if (diffAt.length !== 2) { return false }
    let [first, second] = diffAt;
    return s[second] === goal[first] && s[first] === goal[second]
  }
}


var buddyStrings1 = function (s, goal) {
  if (s === goal) {
    let seen = new Set()
    for (c of s) {
      if (seen.has(c)) { return true }
      seen.add(c)
    }
    return false
  } else {
    let i = 0;
    while (s[i] === goal[i]) { i++ }
    let j = i + 1
    while (j < s.length && s[j] === goal[j]) { j++ }
    // console.log({i, j})
    if (j >= s.length) { return false }
    s = s.slice(0, i) + s[j] + s.slice(i + 1, j) + s[i] + s.slice(j + 1)
    // console.log({s, goal})
    return s === goal
  }
};

const tests = [
  { args: ["ab", "ba"], out: true },
  { args: ["ab", "ab"], out: false },
  { args: ["aa", "aa",], out: true },
];

tests.forEach((t, i) => {
  let res = buddyStrings(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});