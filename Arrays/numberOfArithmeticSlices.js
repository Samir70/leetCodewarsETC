// dp = 80ms; 57%, 31%
// There is no way dp used less memory than below
var numberOfArithmeticSlices = function (arr) {
    if (arr.length < 3) { return 0 }
    let dp = Array(arr.length).fill(0);
    const trio = i => arr[i] - arr[i - 1] === arr[i - 1] - arr[i - 2]
    if (trio(2)) { dp[2] = 1 }
    slices = dp[2]
    for (let i = 3; i < arr.length; i++) {
        dp[i] = trio(i) ? dp[i - 1] + 1 : 0
        slices += dp[i]
    }
    return slices
};

// refactored to not use an array
// 84ms; 35%, 42$
var numberOfArithmeticSlices = function(arr) {
    if (arr.length < 3) {return 0}
    const trio = i => arr[i] - arr[i-1] === arr[i-1] - arr[i-2];
    let dp = trio(2) ? 1 : 0
    slices = dp;
    for (let i = 3; i<arr.length; i++) {
        dp = trio(i) ? dp + 1 : 0
        slices += dp
    }
    return slices
};

// 76ms; 78%, 14%
var numberOfArithmeticSlices = function(arr) {
    if (arr.length < 3) {return 0}
    let slices = 0;
    let left = 0, right = 1;
    let diff = arr[right] - arr[left]
    while (right < arr.length) {
        while (right < arr.length && arr[right+1] - arr[right] === diff) {
            right++;
        }
        let n = right - left - 1;
        // number of possible values for left is a triangular number
        slices += n*(n+1)/2
        left = right;
        right = left + 1; 
        diff = arr[right] - arr[left]
    }
    return slices
};

// refactored:
// 76ms; 78%, 42%
var numberOfArithmeticSlices = function(arr) {
    if (arr.length < 3) {return 0}
    const diffAtIndex = i => arr[i] - arr[i-1];
    slices = 0;
    let diff = diffAtIndex(1)
    let i = 2;
    let count = 0;
    while (i < arr.length) {
        while (diffAtIndex(i) === diff) {
            count++; i++
        }
        slices += count*(count+1)/2;
        diff = diffAtIndex(i)
        i++;
        count = 0;
    }
    return slices
};

const tests = [
    { arr: [1, 2, 3, 4, 5, 6], out: 10 },
    { arr: [1, 2, 3, 4, 5, 6, 7, 9, 12, 15, 18, 21, 20, 19, 18, 17, 15, 14, 13, 12, 10, 8], out: 31 },
    { arr: [1, 2], out: 0 }
]

tests.forEach((t, i) => console.log(
    'test', i, numberOfArithmeticSlices(t.arr) === t.out
))