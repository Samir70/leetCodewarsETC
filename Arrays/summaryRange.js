/**
 * 
 * @param {*} nums is a sorted unique integer array
 * return intervals that cover all the numbers in nums, and only those numbers
 */

const summaryRanges = nums => {
    let out = [];
    let i = 0;
    while (i < nums.length) {
        let start = nums[i], end = nums[i];
        i++;
        while (i < nums.length && nums[i] === end+1) {
            end++; 
            i++
        }
        out.push(start === end? ""+start : start+'->'+end)
    }
    return out
}

const tests = [
    { nums: [0, 1, 2, 4, 5, 7], out: ["0->2", "4->5", "7"] },
    { nums: [0, 2, 3, 4, 6, 8, 9], out: ["0", "2->4", "6", "8->9"] },
    { nums: [], out: [] },
    { nums: [-1], out: ["-1"] },
];

tests.forEach((t, i) => console.log(
    'test', i, summaryRanges(t.nums).join(',') === t.out.join(',')
))