/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
// Slow and a memory hog
var jobScheduling = function (startTime, endTime, profit) {
  const n = profit.length;
  const jobs = [];
  for (let i = 0; i < n; i++) {
    jobs.push([startTime[i], endTime[i], profit[i]])
  }
  jobs.sort((a, b) => a[0] === b[0] ? a[2] - b[2] : a[0] - b[0]);
  // console.log(jobs)
  const profitFromTime = {}
  let [s, e, p] = jobs[n - 1];
  profitFromTime[s] = p;
  let i = n - 2;
  while (i >= 0) {
    let prevS = s;
    [s, e, p] = jobs[i];
    // console.log({i, s, e, prevS})
    while (prevS >= s) {
      profitFromTime[prevS - 1] = profitFromTime[prevS];
      prevS--
    }
    // console.log("before",profitFromTime)
    profitFromTime[s] = Math.max(profitFromTime[s], p + (profitFromTime[e] || 0));
    i--;
    // console.log("after",profitFromTime)
  }
  return profitFromTime[s]
};

const { bigTest } = require("./06bigtest");
const tests = [
  { args: [[1, 3, 3, 2], [3, 6, 5, 4], [50, 70, 40, 10]], out: 120 },
  { args: [[1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]], out: 150 },
  { args: [[1, 1, 1], [2, 3, 4], [5, 6, 4]], out: 6 },
  { args: [...bigTest], out: 159937 },
];

tests.forEach((t, i) => {
  let res = jobScheduling(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});