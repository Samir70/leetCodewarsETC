// Each candidate can only be used once. Only include each combination once, regardless of order

// 140ms, 16%
// may be able to avoid sort, since candidates are considered in turn
var combinationSum2 = function (candidates, target) {
    let combinations = [];
    let hash = {}
    const complete = (soFar, sumOfSoFar, lastUsed) => {
        if (sumOfSoFar > target) { return null }
        if (sumOfSoFar === target) {
            let sorted = [...soFar].sort((a, b) => a - b)
            let key = sorted.join(',');
            if (hash[key] !== 'found') {
                hash[key] = 'found';
                combinations.push(sorted);
            }
            return null
        }
        for (let i=lastUsed+1; i < candidates.length; i++) {
            complete([...soFar, candidates[i]], sumOfSoFar+candidates[i], i)
        }
        return null
    }

    candidates.forEach((c, i) => {
        complete([c], c, i)
    });

    return combinations
};
