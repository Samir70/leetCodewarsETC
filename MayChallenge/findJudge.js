const tests = [
    { population: 2, trust: [[1, 2]], output: 2 },
    { population: 3, trust: [[1, 3], [2, 3]], output: 3 },
    { population: 3, trust: [[1, 3], [2, 3], [3, 1]], output: -1 },
    { population: 3, trust: [[1, 2], [2, 3]], output: -1 },
    { population: 4, trust: [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]], output: 3 }
];


const findJudge = (n, trust) => {
    const trustsCount = Array(n).fill(0);
    const trustedByCount = Array(n).fill(0);
    trust.forEach(t => {
        trustsCount[t[0]-1]++;
        trustedByCount[t[1]-1]++
    });
    const trustsNone = trustsCount.reduce((acc, val, i) => val === 0 ? [...acc, i+1] : acc, [] );
    const trustedByAll = trustedByCount.reduce((acc, val, i) => val === n-1 ? [...acc, i+1] : acc, [] )
    console.log( {trustsCount, trustedByCount, trustsNone, trustedByAll});
    if (trustsNone.length !== 1 || trustedByAll.length !== 1) {return -1}
    return trustsNone[0] === trustedByAll[0] ? trustsNone[0] : -1
}
tests.forEach(t => console.log(findJudge(t.population, t.trust), 'expected', t.output));