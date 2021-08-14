// TLEs
const minSpaceWastedKResizing = (nums, k) => {
    if (nums.length - 1 === k) { return 0 }
    let memo = {}
    var helper = function (nums, k) {
        if (nums.length === 0) { return 0 }
        if (k < 0) { return Infinity }
        let key = [...nums, k].join(',');
        if (memo[key] !== undefined) { return memo[key] }
        // console.log('workin on ', key)
        let sum = 0, minWaste = Infinity, maxH = 0;
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            maxH = Math.max(maxH, nums[i]);
            let wasted = maxH * (i + 1) - sum + helper(nums.slice(i + 1), k - 1)
            minWaste = Math.min(minWaste, wasted)
        }
        memo[key] = minWaste;
        return minWaste
    };
    return helper(nums, k)
}

const bigTest = require('./3-bigTest')
const tests = [ bigTest, 
    { arr: [7, 25, 18, 30, 41], k: 1, out: 36 },
    { arr: [7, 25, 18, 30, 29], k: 1, out: 18 },
    { arr: [3, 5, 6, 7, 20, 5, 7, 4, 30, 4, 7, 21, 21, 22, 28], k: 3, out: 89 },
    {
        arr: [438, 575, 10, 115, 78, 968, 905, 708, 926, 153, 559, 37, 855, 379, 597, 566, 152, 441, 131, 43, 316, 374, 921, 956, 816, 996, 882, 41, 921, 367, 216, 699, 256, 683, 106, 363, 799, 574, 906, 896, 417, 998, 636, 768, 159, 948],
        k: 45, out: 0
    },
    // { arr: bigTest.arr, k: bigTest.k, out: bigTest.out }
]

tests.forEach((t, i) => console.log(
    'test', i, minSpaceWastedKResizing(t.arr, t.k) === t.out
))