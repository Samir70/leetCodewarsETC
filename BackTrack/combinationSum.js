// 240ms; beats 8%
var combinationSum = function (candidates, target) {
    let combinations = [];
    let hash = {}
    const complete = (soFar, sumOfSoFar) => {
        if (sumOfSoFar > target) { return null }
        if (sumOfSoFar === target) {
            let key = soFar.sort((a, b) => a - b).join(',');
            if (hash[key] !== 'found') {
                hash[key] = 'found';
                combinations.push(soFar.sort((a, b) => a - b));
            }
            return null
        }
        candidates.forEach(c => {
            complete([...soFar, c], sumOfSoFar + c)
        })
        return null
    }

    candidates.forEach(c => {
        complete([c], c)
    });

    return combinations
};

const tests = [
    { candidates: [2, 3, 6, 7], target: 7, out: [[7], [2, 2, 3]] },
    { candidates: [2, 3, 5], target: 8, out: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] }
]

tests.forEach((t, i) => console.log(
    'test', i, combinationSum(t.candidates, t.target), 'should be like', t.out
))