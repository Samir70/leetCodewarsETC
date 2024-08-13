/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let combinations = [];
  let hash = {}
  candidates.sort((a, b) => a - b)
  const complete = (soFar, sumOfSoFar, lastUsed) => {
    if (sumOfSoFar > target) { return null }
    if (sumOfSoFar === target) {
      let key = soFar.join(',');
      if (hash[key] !== 'found') {
        hash[key] = 'found';
        combinations.push(soFar);
      }
      return null
    }
    for (let i = lastUsed + 1; i < candidates.length; i++) {
      if (i > lastUsed + 1 && candidates[i] === candidates[i - 1]) { continue }
      complete([...soFar, candidates[i]], sumOfSoFar + candidates[i], i)
    }
    return null
  }

  candidates.forEach((c, i) => {
    complete([c], c, i)
  });

  return combinations
};

// Each candidate can only be used once.
// Only include each combination once, regardless of order

// 140ms, 16%
// may be able to avoid sort, since candidates are considered in turn