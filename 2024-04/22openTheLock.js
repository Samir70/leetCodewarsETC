// https://leetcode.com/problems/open-the-lock/
var openLock = function (deadends, target) {
  if (target === '0000') { return 0 }
  let stack = [0], seen = new Set(deadends.map(Number))
  if (seen.has(0)) { return -1 }
  let tar = Number(target)
  for (let turns = 1; stack.length > 0; turns++) {
    let len = stack.length;
    // because turns only increments when the current stack is finished
    for (let i = 0; i < len; i++) {
      let cur = stack.shift()
      let powers = [1, 10, 100, 1000]
      for (let p of powers) {
        let mask = Math.floor((cur % (p * 10)) / p);
        let masked = cur - (mask * p)
        for (let diff of [1, 9]) {
          let next = masked + ((mask + diff) % 10) * p
          if (seen.has(next)) { continue }
          if (next === tar) { return turns }
          seen.add(next)
          stack.push(next)
        }
      }
    }
  }
  return -1
};


const tests = [
  { args: [["0201", "0101", "0102", "1212", "2002"], "0202",], out: 6 },
  { args: [["8888"], "0009",], out: 1 },
  { args: [["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], "8888",], out: -1 },
];

tests.forEach((t, i) => {
  let res = openLock(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});