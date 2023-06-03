var numOfMinutes = function (n, headID, manager, informTime) {
  let subords = {}
  for (let i = 0; i < n; i++) {
    if (subords[manager[i]] === undefined) { subords[manager[i]] = [] }
    subords[manager[i]].push(i)
  }
  console.log(subords);
  let mustTell = [{ id: headID, timeKnows: 0 }]
  let maxTime = 0;
  let hasNews = new Set()
  hasNews.add(headID);
  while (hasNews.size < n) {
    let newMustTell = []
    for (let boss of mustTell) {
      let timeTells = boss.timeKnows + informTime[boss.id]
      if (timeTells > maxTime) { maxTime = timeTells }
      // if (subords[boss.id === undefined]) {subords[boss.id] = []}
      for (let subord of subords[boss.id] || []) {
        hasNews.add(subord)
        newMustTell.push({ id: subord, timeKnows: timeTells })
      }
    }
    mustTell = [...newMustTell]
  }
  return maxTime
};

const tests = [
  {
    n: 8, headID: 0,
    manager: [-1, 5, 0, 6, 7, 0, 0, 0],
    informTime: [89, 0, 0, 0, 0, 523, 241, 519],
    out: 612
  }
];

tests.forEach((t, i) => {
  let res = numOfMinutes(t.n, t.headID, t.manager, t.informTime);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, " got ", res, "\n\n"
    )
  }
});