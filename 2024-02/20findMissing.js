/**
 * nums is filled with n distinct numbers [0..n]
 * find missing number
 */

const missingNumber1 = nums => {
    nums.push(null)
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== null && nums[i] !== i) {
            let t = nums[i];
            nums[i] = nums[t];
            nums[t] = t
        }
    }
    return nums.indexOf(null)
}

// 84ms = 83%
const missingNumber = nums => {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i]
    }
    return missing
}

const tests = [
    { nums: [3, 0, 1], out: 2 },
    { nums: [0, 1], out: 2 },
    { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1], out: 8 },
    { nums: [0], out: 1 }
];

tests.forEach((t, i) => console.log(
    'test', i, missingNumber(t.nums) === t.out
))