// DP gave TLE when k = 41000
var mostCompetitive = function (nums, k) {
    let stack = [];
    let drop = nums.length - k;
    for (let n of nums) {
        while (stack.length && stack[stack.length - 1] > n && drop > 0) {
            stack.pop();
            drop--
        }
        stack.push(n)
    }
    while (drop > 0) {stack.pop(); drop--}
    return stack
};

const tests = [
    { nums: [3, 5, 2, 6], k: 2 , out:[2, 6]},
    { nums: [2, 4, 3, 3, 5, 4, 9, 6], k: 4 , out:[2, 3, 3, 4]},
    { nums: [2, 4, 3, 3, 5, 4, 9, 6], k: 1, out:[2] }
];

tests.forEach((t, i) => console.log(
    'test', i, mostCompetitive(t.nums, t.k), 'should be', t.out
))