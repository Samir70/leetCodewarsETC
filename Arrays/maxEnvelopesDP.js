const { bigTest } = require('./maxEnvsBigTest')
// Russian Doll the envelopes, no rotations
// TLE on bigtest
const fitsIn = (a, b) => a[0] < b[0] && a[1] < b[1]
const maxEnvelopes = envs => {
    envs.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    // console.log(envs)
    let maxContents = Array(envs.length).fill(1)
    for (let i = 1; i < envs.length; i++) {
        // console.log(i, maxContents[i-1])
        for (let j = i - 1; j >= 0; j--) {
            if (fitsIn(envs[j], envs[i])) {
                maxContents[i] = Math.max(maxContents[i], maxContents[j] + 1);
                // break
            }
        }
    }
    return Math.max(...maxContents)
}

const tests = [
    { envs: [[5, 4], [6, 7], [6, 4], [2, 3]], out: 3 },
    { envs: [[1, 1], [1, 1], [1, 1]], out: 1 },
    { envs: [[2, 100], [3, 200], [4, 300], [5, 500], [5, 400], [5, 250], [6, 370], [6, 360], [7, 380]], out: 5 },
    { envs: bigTest, out: 35 }
];

tests.forEach((t, i) => console.log(
    'tests', i, maxEnvelopes(t.envs) === t.out
))