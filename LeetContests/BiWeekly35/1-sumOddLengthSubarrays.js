// 76ms; beats 100% Out of very few
const sumOddLengthSubarrays = arr => {
    let len = arr.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        let odd = 1;
        while (odd <= len) {
            let maxFit = len - odd + 1;
            let fromEnd = len - i - 1
            let mult = Math.min(i+1, odd, fromEnd+1, maxFit)
            // console.log('adding', mult*arr[i], '=', mult, '*', arr[i], 'for subarray length', odd)
            sum += mult * arr[i]
            odd += 2
        }
    }
    return sum
}

// consider the O(n) version here:
// https://leetcode.com/problems/sum-of-all-odd-length-subarrays/discuss/854184/JavaC%2B%2BPython-O(N)-Time-O(1)-Space

const tests = [
    { in: [1, 4, 2, 5, 3], out: 58 },
    { in: [1, 2], out: 3 },
    { in: [10, 11, 12], out: 66 }
];

tests.forEach((t, i) => console.log(
    'test', i, sumOddLengthSubarrays(t.in) === t.out
))