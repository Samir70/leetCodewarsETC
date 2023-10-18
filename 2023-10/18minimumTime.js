/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number[]} time
 * @return {number}
 */
var minimumTime = function (n, relations, time) {
  let noPrevs = new Set([...Array(n)].map((x, i) => i + 1));
  let insAndOuts = Array(n + 1);
  for (let i = 1; i <= n; i++) {
    insAndOuts[i] = { ins: new Set(), outs: new Set(), duration: time[i - 1] }
  }
  for (let [a, b] of relations) {
    noPrevs.delete(b)
    insAndOuts[a].outs.add(b)
    insAndOuts[b].ins.add(a)
  }
  // console.log(insAndOuts)
  let canStudy = [...noPrevs];
  let studied = []
  while (canStudy.length > 0 && studied.length < n) {
    let newCanStudy = []
    let studyGroup = []
    while (canStudy.length > 0) {
      let cur = canStudy.pop()
      studyGroup.push(cur)
      for (let nextCourse of [...insAndOuts[cur].outs]) {
        insAndOuts[nextCourse].ins.delete(cur)
        if (insAndOuts[nextCourse].ins.size === 0) {
          newCanStudy.push(nextCourse)
        }
      }
    }
    canStudy = [...newCanStudy]
    studied.push(studyGroup)
  }
  // console.log(studied)
  for (let [a, b] of relations) {
    insAndOuts[b].ins.add(a)
  }
  let maxFinishTime = 0
  for (let studyGroup of studied) {
    for (let course of studyGroup) {
      let prevs = [...insAndOuts[course].ins]
      let prevStudytime = prevs.length === 0 ? 0 : Math.max(...prevs.map(p => insAndOuts[p].finishTime))
      insAndOuts[course].finishTime = prevStudytime + insAndOuts[course].duration
      maxFinishTime = Math.max(maxFinishTime, insAndOuts[course].finishTime)
      // console.log({ studyGroup, insAndOuts, course, prevs, prevStudytime })
    }
  }
  return maxFinishTime
};

const tests = [
  { args: [3, [[1, 3], [2, 3]], [3, 2, 5]], out: 8 },
  { args: [5, [[1, 5], [2, 5], [3, 5], [3, 4], [4, 5]], [1, 2, 3, 4, 5]], out: 12 },
  { args: [5, [[1, 5], [2, 5], [3, 5], [3, 4]], [1, 2, 3, 4, 5]], out: 8 },
  { args: [5, [[1, 5], [2, 5], [3, 4]], [1, 2, 3, 4, 5]], out: 7 },
];

tests.forEach((t, i) => {
  // if (i !== 1) { return }
  let res = minimumTime(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});