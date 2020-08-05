var decompressRLElist = function (nums) {
    var freq = 0, val = 1;
    var out = []
    while (val < nums.length) {
        var f = nums[freq], v = nums[val]
        while (f > 0) {
            out.push(v);
            f--
        }
        freq += 2;
        val += 2;
    }
    return out
};

const tests = [
    { in: [1, 2, 3, 4], out: [2, 4, 4, 4] },
    { in: [1, 1, 2, 3], out: [1, 3, 3] }
]

tests.forEach((t, i) => console.log(
    'test', i, decompressRLElist(t.in), 'should be', t.out
))