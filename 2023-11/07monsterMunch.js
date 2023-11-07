/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
var eliminateMaximum = function (dist, speed) {
  let arrivalTimes = dist.map((d, i) => d/speed[i]).sort((a, b) => a - b)
  let shots = 0
  while (shots < arrivalTimes[shots]) {
    shots++
  }
  return shots
};

const tests = [
  { args: [[1, 3, 4], [1, 1, 1]], out: 3 },
  { args: [[1, 1, 2, 3], [1, 1, 1, 1]], out: 1 },
  { args: [[3, 2, 4], [5, 3, 2]], out: 1 },
];

tests.forEach((t, i) => {
  let res = eliminateMaximum(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});