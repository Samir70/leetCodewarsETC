var smallerNumbersThanCurrent = function (nums) {
    let sorted = [...nums].sort((a, b) => a - b);
    return nums.map(x => sorted.indexOf(x))
};

/**
 * faster with bucket sort since Q says input is 0..100:
 * class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        count = [0] * 102
        for num in nums:
            count[num+1] += 1
        for i in range(1, 102):
            count[i] += count[i-1]
        return [count[num] for num in nums]
 */

const tests = [
    { in: [8, 1, 2, 2, 3], out: [4, 0, 1, 1, 3] },
    { in: [6, 5, 4, 8], out: [2, 1, 0, 3] },
    { in: [7, 7, 7, 7], out: [0, 0, 0, 0] }
];

tests.forEach((t, i) => console.log(
    'test', i, smallerNumbersThanCurrent(t.in), 'should be', t.out
))