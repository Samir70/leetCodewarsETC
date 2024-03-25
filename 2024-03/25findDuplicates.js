/**
 * 1 ≤ a[i] ≤ a.length
 * some elements appear twice and others appear once.
 * Find all the elements that appear twice in this array.
 * Could you do it without extra space and in O(n) runtime?
 */

 // extra mem
var findDuplicatesExtraMem = function (nums) {
    const seen = new Set();
    var out = []
    for (var n of nums) {
        if (seen.has(n)) {
            out.push(n)
        } else {
            seen.add(n)
        }
    } 
    return out
};

var findDuplicates = function(nums) {
    var out = []
    var i = 1;
    while (i <= nums.length) {
        // console.log(i,nums, out)
        var ithInList = nums[i-1];
        if (ithInList < 0) {
            i++;
            continue
        }
        if (nums[ithInList - 1] === -ithInList) {
            out.push(ithInList);
            nums[i-1] = -ithInList;
            i++
        } else {
            nums[i-1] = nums[ithInList-1];
            nums[ithInList - 1] = -ithInList
        }
    }
    return out
};

const tests = [
    { in: [4, 3, 2, 7, 8, 2, 3, 1], out: [2, 3] },
    { in: [1, 2, 3, 4], out: [] },
    { in: [1, 2, 3, 4, 1], out: [1] },
    { in: [4, 1, 2, 3, 4], out: [4] },
    { in: [4, 3, 2, 1, 4], out: [4] }
];

tests.forEach((t, i) => console.log(
    'test', i, findDuplicates(t.in), 'should be', t.out
))