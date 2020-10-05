var findPairs = function (nums, k) {
    let numsSet = new Set(nums);
    let usedAsSmall = new Set();
    let pairs = 0
    if (k === 0) {
        let seen = new Set()
        for (let n of nums) {
            if (usedAsSmall.has(n)) { continue }
            if (seen.has(n)) {
                pairs++;
                usedAsSmall.add(n)
            } else {
                seen.add(n)
            }
        }
    } else {
        // k != 0
        for (let n of nums) {
            if (usedAsSmall.has(n)) { continue }
            if (numsSet.has(n + k)) {
                pairs++;
                usedAsSmall.add(n)
            }
        }
    }
    return pairs
};

const tests = [
    { nums: [3, 1, 4, 1, 5], k: 2, out: 2 },
    { nums: [3, 1, 4, 1, 5], k: 0, out: 1 },
    { nums: [1, 1, 1, 1, 1, 1], k: 0, out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, findPairs(t.nums, t.k) === t.out
))