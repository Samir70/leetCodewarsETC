/**
 * given an array and integer p, 
 * find the smallest subarray you can remove to get a sum divisible by 
 * return its length, or -1 if not possible
 */
const bigArr = require('../../Arrays/bigArray')

/**
 * Tried with a hash map to keep track of which sums had been found,
 * But this got TLE since I was comparing current sum with all previous.
 * 
 * Worked with sum being done mod p
 * This worked, needed some care with modulus function
 */
const minSubarray = (nums, p) => {
    let target = nums.reduce((a, c) => (a + c) % p, 0);
    if (target === 0) { return 0 }
    if (nums.length === 1) {
        return -1
        // have to remove something, can't remove everything
    }
    let posAns = Infinity;
    let hash = new Map();
    hash.set(0, -1)
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum = (sum + nums[i]) % p;
        // we are looking for sum - ?? = target (mod p)
        // so ?? = sum - target (mod p)
        // the way % works in JS, we need ?? = (p + sum - target) % p
        let x = (p + sum - target) % p;
        if (hash.has(x)) {posAns = Math.min(posAns, i - hash.get(x))}
        hash.set(sum, i);
    }
    return posAns === Infinity || posAns === nums.length ? -1 : posAns
}

const tests = [
    { nums: [3, 1, 4, 2], p: 6, out: 1 },
    { nums: [6, 3, 5, 2], p: 9, out: 2 },
    { nums: [1, 2, 3], p: 3, out: 0 },
    { nums: [1, 2, 3], p: 7, out: -1 },
    { nums: [26, 19, 11, 14, 18, 4, 7, 1, 30, 23, 19, 8, 10, 6, 26, 3], p: 26, out: 3 },
    { nums: bigArr.bigArray, p: 19, out: 5 }
];

tests.forEach((t, i) => console.log(
    'test', i, minSubarray(t.nums, t.p) === t.out
))