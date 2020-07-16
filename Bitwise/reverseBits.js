var reverseBits = function(n) {
    var bin = n.toString(2);
    while (bin.length < 32) {bin = '0'+bin}
    var rev = [...bin].reverse().join('')
    console.log(n, bin, rev)
    return parseInt(rev, 2)
};

const tests = [
    {in:31, out:4160749568},
    {in:1, out:2147483648}
];

tests.forEach(t => console.log(
    reverseBits(t.in)
))