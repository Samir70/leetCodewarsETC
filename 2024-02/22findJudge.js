const findJudge = (n, trust) => {
  const trustsCount = Array(n).fill(0);
  const trustedByCount = Array(n).fill(0);
  trust.forEach(t => {
    trustsCount[t[0] - 1]++;
    trustedByCount[t[1] - 1]++
  });
  const trustsNone = trustsCount.reduce((acc, val, i) => val === 0 ? [...acc, i + 1] : acc, []);
  const trustedByAll = trustedByCount.reduce((acc, val, i) => val === n - 1 ? [...acc, i + 1] : acc, [])
  // console.log({ trustsCount, trustedByCount, trustsNone, trustedByAll });
  if (trustsNone.length !== 1 || trustedByAll.length !== 1) { return -1 }
  return trustsNone[0] === trustedByAll[0] ? trustsNone[0] : -1
}

const tests = [
  { args: [2, [[1, 2]]], out: 2 },
  { args: [3, [[1, 3], [2, 3]]], out: 3 },
  { args: [3, [[1, 3], [2, 3], [3, 1]]], out: -1 },
  { args: [3, [[1, 2], [2, 3]]], out: -1 },
  { args: [4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]]], out: 3 }
];

tests.forEach((t, i) => {
  let res = findJudge(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});