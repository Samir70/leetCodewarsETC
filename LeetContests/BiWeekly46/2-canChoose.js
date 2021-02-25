/**
 * 
 * @param {*} groups 
 * @param {*} nums 
 * Can the rows of groups be found as a subsequence of nums
 */

var canChoose = function (groups, nums) {
    let targetRow = 0, targetCol = 0;
    let n = 0; // index of nums
    while (n < nums.length && targetRow < groups.length) {
        while (nums[n] !== groups[targetRow][0] && n < nums.length) {
            n++
        }
        while (n < nums.length && targetCol < groups[targetRow].length && groups[targetRow][targetCol] === nums[n]) {
            n++; targetCol++
        }
        if (targetCol === groups[targetRow].length) {
            targetRow++
        }
        targetCol = 0
    }
    return targetRow === groups.length
};

const tests = [
    { g: [[1, -1, -1], [3, -2, 0]], n: [1, -1, 0, 1, -1, -1, 3, -2, 0], out: true },
    { g: [[10, -2], [1, 2, 3, 4]], n: [1, 2, 3, 4, 10, -2], out: false },
    { g: [[1, 2, 3], [3, 4]], n: [7, 7, 1, 2, 3, 4, 7, 7], out: false }
]

