const fairCandySwap = (alice, bob) => {
    let sumA = alice.reduce((a, b) => a + b, 0);
    let sumB = bob.reduce((a, b) => a + b, 0);
    let diff = sumA - sumB
    if (diff % 2 === 1) { return null }
    diff /= 2;
    console.log(diff)
    let setB = new Set(bob);
    let setA = new Set(alice);
    if (diff < 0) {
        for (let a of alice) {
            if (setB.has(a-diff)) {return [a, a-diff]}
        }
    } else {
        for (let b of bob) {
            if (setA.has(b+diff)) {return [b+diff, b]}
        }
    }
    return [0, 0]
};

const tests = [
    { alice: [1, 1], bob: [2, 2], out: [1, 2] },
    { alice: [1, 2, 5], bob: [2, 4], out: [5, 4] },
    { alice: [2], bob: [1, 3], out: [2, 3] }
]

tests.forEach((t, i) => console.log(
    'test', i, fairCandySwap(t.alice, t.bob), 'should be', t.out
));
