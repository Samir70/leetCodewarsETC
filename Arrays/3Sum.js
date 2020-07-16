var threeSum = function (nums) {
    var len = nums.length;
    var sorted = [...nums].sort((a, b) => a - b);
    var out = [];
    var found = new Set()
    for (var s = 0; s < len - 2; s++) {
        var smallest = sorted[s];
        var m = s + 1, b = len - 1;
        while (m < b) {
            var mid = sorted[m], biggest = sorted[b]
            // console.log('looking at', smallest, mid, biggest)
            if (smallest + mid + biggest === 0) {
                var include = [smallest, mid, biggest]
                if (!found.has(include.join(','))) {
                    out.push(include)
                    found.add(include.join(','))
                }
                b--;
                m++
            } else {
                if (smallest + mid + biggest > 0) {
                    b--
                } else {
                    m++
                }
            }
        }
    }
    return out
};
// skip equal elements, to avoid needing to use a set
// once nums[i] > 0, then break.

const tests = [
    { in: [-1, 0, 1, 2, -1, -4], out: [[-1, 0, 1], [-1, -1, 2]] },
    { in: [-1, 0, 1, 2, -1, -4, 8, -3, -5, 8], out: [[-5, -3, 8], [-3, 1, 2], [-1, -1, 2], [-1, 0, 1]] }
];

tests.forEach((t, i) => console.log(
    'test', i, threeSum(t.in)
))