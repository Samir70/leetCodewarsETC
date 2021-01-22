// DP gave TLE when k = 41000
var mostCompetitive = function (nums, k) {
    if (nums.length === k) { return nums }
    if (k === 1) { return [Math.min(...nums)] }
    let bestSoFar = nums.slice(0, k);
    for (let i = k; i < nums.length; i++) {
        bestSoFar.push(nums[i]);
        // remove first element that is followed by smaller, or the last
        let j = 1;
        while (j < bestSoFar.length) {
            if (bestSoFar[j] < bestSoFar[j - 1]) { break }
            j++
        }
        bestSoFar = bestSoFar.filter((x, ind) => ind !== j - 1)
    }
    return bestSoFar
};

const tests = [
    { nums: [3, 5, 2, 6], k: 2 , out:[2, 6]},
    { nums: [2, 4, 3, 3, 5, 4, 9, 6], k: 4 , out:[2, 3, 3, 4]},
    { nums: [2, 4, 3, 3, 5, 4, 9, 6], k: 1, out:[2] }
]