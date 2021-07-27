// 128ms beating 55%
const atMostKDistinct = (nums, k) => {
    if (k === 0) { return 0 }
    let left = 0, right = 0, count = 0;
    let tally = {}, distinct = new Set();
    while (right < nums.length) {
        // count how many subarrays end at right
        tally[nums[right]] = (tally[nums[right]] || 0) + 1
        distinct.add(nums[right]);
        while (distinct.size > k) {
            tally[nums[left]]--
            if (tally[nums[left]] === 0) { distinct.delete(nums[left]) }
            left++
        }
        count += right - left + 1;
        right++
    }
    return count
}

const subarraysWithKDistinct = (nums, k) => {
    return atMostKDistinct(nums, k) - atMostKDistinct(nums, k - 1)
}

const tests = [
    { nums: [1, 2, 1, 2, 3], k: 2, out: 7 },
    { nums: [1, 2, 1, 3, 4], k: 3, out: 3 }
]

tests.forEach((t, i) => console.log(
    'test', i, subarraysWithKDistinct(t.nums, t.k) === t.out
))