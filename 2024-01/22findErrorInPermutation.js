/**
 * a set [1..n] has been mixed, but one value was accidently changed to another of 1..n
 * return [repeated, missing]
 */
// 116ms, 35%
var findErrorNums1 = function (nums) {
    let one2n = new Set([...Array(nums.length)].map((_, i) => i + 1));
    let found = new Set();
    let repeated = 0;
    for (let n of nums) {
        one2n.delete(n);
        if (found.has(n)) { repeated = n }
        found.add(n);
    }
    return [repeated, ...one2n]
};

// 88ms = 89%
const findErrorNums = nums => {
    nums.unshift(0)
    for (let i = 1; i < nums.length; i++) {
        while (nums[i] !== i && nums[i] !== nums[nums[i]]) {
            let t = nums[i];
            nums[i] = nums[t];
            nums[t] = t 
        }
    }
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== i) { return [nums[i], i] }
    }
    return [0, 0]
}

const tests = [
    { nums: [3, 2, 2], out: [2, 1] },
    { nums: [1, 2, 3, 3, 4, 5, 6], out: [3, 7] }
];

tests.forEach((t, i) => console.log(
    'test', i, findErrorNums(t.nums), 'should be', t.out// === t.out
))