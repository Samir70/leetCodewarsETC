const gcd = (a, b) => {
    if (b === 0 || a === b) { return a }
    if (a === 0) { return b }
    return a > b ? gcd(a % b, b) : gcd(a, b % a)
}
let hash = {}

const maxScore = nums => {
    let key = nums.join(',');
    if (hash[key] !== undefined) { return hash[key] }
    if (nums.length === 2) { return gcd(...nums) }
    let level = nums.length / 2;
    let max = 0;
    let finalPairs = []
    for (i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            finalPairs.push([i, j])
        }
    }
    // console.log(finalPairs)
    while (finalPairs.length) {
        let [i, j] = finalPairs.pop()
        // console.log('selecting', i, j, 'for level ', level)
        let score = level * gcd(nums[i], nums[j])
        score += maxScore(nums.filter((_, x) => x !== i && x !== j))
        if (score > max) {
            max = score;
            // console.log(nums, max, 'via', level, '* gcd', nums[i], nums[j])
        }

    }
    hash[key] = max
    return max
}

const tests = [
    { nums: [1, 2], out: 1 },
    { nums: [3, 4, 6, 8], out: 11 },
    { nums: [1, 2, 3, 4, 5, 6], out: 14 },
    { nums: [878394, 878394, 878394, 878394], out: 2635182 },
    { nums: [5, 7, 8, 9, 34, 45, 56, 67, 78, 12, 23, 43, 54, 65], out: 215 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxScore(t.nums) === t.out
))