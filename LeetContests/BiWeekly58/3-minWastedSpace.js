// TLEs
const minSpaceWastedKResizing = (nums, k) => {
    let n = nums.length;
    let memo = {}
    var helper = (i, k) => {
        if (i === n) { return 0 }
        if (k === -1) { return Infinity }
        let key = [i, k].join(',');
        if (memo[key] !== undefined) { return memo[key] }
        // console.log('workin on ', key)
        let sum = 0, minWaste = Infinity, maxH = nums[i];
        for (let j = i; j < n; j++) {
            sum += nums[j];
            maxH = Math.max(maxH, nums[j]);
            let wasted = maxH * (j - i + 1) - sum + helper(j + 1, k - 1)
            minWaste = Math.min(minWaste, wasted)
        }
        memo[key] = minWaste;
        return minWaste
    };
    return helper(0, k)
}

const bigTest = require('./3-bigTest')
const tests = [
    { arr: [7, 25, 18, 30, 41], k: 1, out: 36 },
    { arr: [7, 25, 18, 30, 29], k: 1, out: 18 },
    { arr: [3, 5, 6, 7, 20, 5, 7, 4, 30, 4, 7, 21, 21, 22, 28], k: 3, out: 89 },
    {
        arr: [438, 575, 10, 115, 78, 968, 905, 708, 926, 153, 559, 37, 855, 379, 597, 566, 152, 441, 131, 43, 316, 374, 921, 956, 816, 996, 882, 41, 921, 367, 216, 699, 256, 683, 106, 363, 799, 574, 906, 896, 417, 998, 636, 768, 159, 948],
        k: 45, out: 0
    },
    bigTest
    // { arr: bigTest.arr, k: bigTest.k, out: bigTest.out }
]

tests.forEach((t, i) => console.log(
    'test', i, minSpaceWastedKResizing(t.arr, t.k) === t.out
))