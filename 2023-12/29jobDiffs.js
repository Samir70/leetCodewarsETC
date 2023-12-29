/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  if (d > jobDifficulty.length) { return -1 }
  let memo = {}
  const helper = (job, maxDiff, doneOneToday, remainingDays) => {
    let key = [job, maxDiff, doneOneToday, remainingDays].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let jobsLeft = jobDifficulty.length - job
    let ans
    let md = Math.max(maxDiff, jobDifficulty[job])
    if (job >= jobDifficulty.length) {
      ans = 0
    } else if (remainingDays > jobsLeft || remainingDays <= 0) {
      ans = Infinity
    } else if (remainingDays === 1) {
      ans = Math.max(...jobDifficulty.slice(job))
    } else if (!doneOneToday) {
      if (remainingDays === jobsLeft) {
        ans = jobDifficulty.slice(job).reduce((a, c) => a + c)
      } else {
        ans = helper(job + 1, md, true, remainingDays)
      }
    } else {
      let addToTodays = helper(job + 1, md, true, remainingDays)
      let lastJobToday = md + helper(job + 1, 0, false, remainingDays - 1)
      let firstJobTomorrow = maxDiff + helper(job, 0, false, remainingDays - 1)
      ans = Math.min(addToTodays, lastJobToday, firstJobTomorrow)
    }
    // console.log({jobsLeft, remainingDays})
    // console.log({ job, md, doneOneToday, remainingDays, ans })
    memo[key] = ans
    return ans
  }
  let ans = helper(0, 0, false, d)
  return ans === Infinity ? -1 : ans
};

const tests = [
  { args: [[9, 9, 9], 4], out: -1 },
  { args: [[7, 9, 3], 1], out: 9 },
  { args: [[6, 5, 4], 2], out: 10 },
  { args: [[6, 5, 4, 3, 2, 1], 2], out: 7 },
  { args: [[7, 9, 3], 3], out: 19 },
  { args: [[1, 1, 1], 3], out: 3 },
  { args: [[7, 1, 7, 1, 7, 1], 3], out: 15 },
  { args: [[11, 111, 22, 222, 33, 333, 44, 444], 6], out: 843 },
];

tests.forEach((t, i) => {
  // if (i !== 2) { return }
  let res = minDifficulty(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});