const lessThanCount = arr => {
    var sorted = [...arr].sort((a, b) => a-b);
    
}

const tests = [
    { in: [8, 1, 2, 2, 3], out: [4, 0, 1, 1, 3] },
    { in: [6, 5, 4, 8], out: [2, 1, 0, 3] },
    { in: [7, 7, 7, 7], out: [0, 0, 0, 0] }
];

tests.forEach((t, i) => console.log(
    'test', i, lessThanCount(t.in), 'should be', t.out
))