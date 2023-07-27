const canPower = (n, bats, hours) => {
  let sum = 0;
  for (let b of bats) {
    sum += Math.min(b, hours)
  }
  return sum >= hours * n
}
/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
var maxRunTime = function (n, batteries) {
  let sum = batteries.reduce((a, c) => a + c, 0);
  let left = 1, right = Math.ceil(sum / n) + 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (canPower(n, batteries, mid)) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left - 1
};

const tests = [
  { args: [2, [3, 3, 3]], out: 4 },
  { args: [2, [1, 1, 1, 1]], out: 2 },
  { args: [3, [1, 1, 1, 3]], out: 1 },
  { args: [8, [3, 5, 4, 5, 5, 5, 6, 7, 6, 5, 4, 3, 4, 6, 7, 8, 8, 7, 6, 5, 4, 3, 46, 5, 4, 5, 6, 3, 2]], out: 20 },
];

tests.forEach((t, i) => {
  let res = maxRunTime(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});