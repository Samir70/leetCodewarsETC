/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function (skill) {
  let total = 0, numTeams = skill.length / 2
  for (let n of skill) {
    total += n
  }
  if (total % numTeams !== 0) { return -1 }
  const target = total / numTeams
  let chemistry = 0
  skill.sort((a, b) => a - b)
  let left = 0, right = skill.length - 1
  while (left < right) {
    let [a, b] = [skill[left++], skill[right--]]
    if (a + b !== target) { return -1 }
    chemistry += a * b
  }
  return chemistry
};

const tests = [
  { args: [[3, 2, 5, 1, 3, 4]], out: 22 },
  { args: [[3, 4]], out: 12 },
  { args: [[1, 1, 2, 3]], out: -1 },
];

tests.forEach((t, i) => {
  let res = dividePlayers(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});