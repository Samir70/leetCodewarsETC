// only beats 30%
// could have done it with one 32xn loop
// oneCount * zeroCount in each column
var totalHammingDistance = function(nums) {
    let oneCount = Array(32).fill(0);
    let compare = 1;
    for (let i = 0; i<32; i++) {
        for (let n of nums) {
            if (n & compare) {oneCount[i]++}
        }
        compare *= 2
    }
    let totalDiff = 0;
    for (let n of nums) {
        compare = 1;
        for (let i = 0; i<32; i++) {
            if (!(n&compare)) {
                totalDiff += oneCount[i]
            }
            compare *= 2
        }
    }
    // console.log(oneCount.join(','))
    return totalDiff;
};

const tests = [
    {nums: [4, 14, 2], out:6},
    {nums: [4, 14, 2, 565, 4543, 44355, 3234, 2435435, 543534], out:274}
];

tests.forEach((t, i) => console.log(
    'test', i, totalHammingDistance(t.nums) === t.out
))