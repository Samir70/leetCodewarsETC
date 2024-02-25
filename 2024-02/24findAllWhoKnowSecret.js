/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
  let learntSecretAtTimeT = Array(n).fill(Infinity)
  learntSecretAtTimeT[0] = 0
  learntSecretAtTimeT[firstPerson] = 0
  let queue = [[0, 0], [firstPerson, 0]]
  let knowsSecret = new Set([0, firstPerson])
  let meetsAtT = {}
  for (let [a, b, t] of meetings) {
    if (meetsAtT[a] === undefined) { meetsAtT[a] = [] }
    if (meetsAtT[b] === undefined) { meetsAtT[b] = [] }
    meetsAtT[a].push([b, t])
    meetsAtT[b].push([a, t])
  }
  while (queue.length > 0) {
    let newQueue = []
    while (queue.length > 0) {
      let [spreader, time] = queue.pop()
      if (learntSecretAtTimeT[spreader] < time) { continue }
      if (meetsAtT[spreader] === undefined) { continue }
      let events = meetsAtT[spreader].sort((a, b) => a[1] - b[1])
      // console.log({spreader, events, since: learntSecretAtTimeT[spreader]})
      for (let [b, t] of events) {
        if (t < time || learntSecretAtTimeT[b] <= t) { continue }
        // console.log({ spreader, partner: b, time: t, partnerLearnt: learntSecretAtTimeT[b] })
        knowsSecret.add(b)
        learntSecretAtTimeT[b] = Math.min(learntSecretAtTimeT[b], t)
        newQueue.push([b, t])
      }
    }
    queue = [...newQueue]
  }
  return [...knowsSecret]
};


const { bigN, bigMeetings, bigFirstPerson, bigOut } = require("./24bigtest")
const { bigN2, bigMeetings2, bigFirstPerson2, bigOut2 } = require("./24bigtest2")
const tests = [
  { args: [6, [[1, 2, 5], [2, 3, 8], [1, 5, 10]], 1], out: [0, 1, 2, 3, 5] },
  { args: [4, [[3, 1, 3], [1, 2, 2], [0, 3, 3]], 3], out: [0, 1, 3] },
  { args: [5, [[3, 4, 2], [1, 2, 1], [2, 3, 1]], 1], out: [0, 1, 2, 3, 4] },
  { args: [6, [[0, 2, 1], [1, 3, 1], [4, 5, 1]], 1], out: [0, 1, 2, 3] },
  // { args: [bigN, bigMeetings, bigFirstPerson], out: bigOut },
  { args: [bigN2, bigMeetings2, bigFirstPerson2], out: bigOut2 }
];

tests.forEach((t, i) => {
  let res = findAllPeople(...t.args);
  if (res.sort((a, b) => a - b).join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});