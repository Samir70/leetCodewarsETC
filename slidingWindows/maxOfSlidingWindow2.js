// slow but passes (23%, 38%)
const maxSlidingWindow = (nums, k) => {
    if (k===1) {return nums}
    let left = 0, right = 1;
    let indexOfMax = 0, max = nums[0];
    let out = []
    while (right < nums.length) {
        while (right - left < k) {
            if (nums[right] > max) {
                max = nums[right];
                indexOfMax = right;
            }
            right++
        }
        out.push(max);
        left++;
        if (left > indexOfMax) {
            indexOfMax = left; max = nums[left];
            for (let i = left; i<right; i++) {
                if (nums[i] > max) {
                    indexOfMax = i; max = nums[i];
                }
            }
        }
    }
    return out
};

const tests = [
    { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, out: [3, 3, 5, 5, 6, 7] },
    { nums: [1, 3, 1, 2, 0, 5], k: 3, out: [3, 3, 2, 5] },
    { nums: [9, 10, 9, -7, -4, -8, 2, -6], k: 5, out: [10, 10, 9, 2] },
    { nums: [1], k: 1, out: [1] }
];

tests.forEach((t, i) => console.log(
    'test', i, maxSlidingWindow(t.nums, t.k).join(',') === t.out.join(',')
))