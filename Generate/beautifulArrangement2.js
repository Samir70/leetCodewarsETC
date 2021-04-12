// need [1..n] arranged so that abs diffs has k different values.
const constructArrayOld = (n, k) => {
    if (k === 1) { return [...Array(n).keys()].map((_, i) => i + 1) }
    let out = [1];
    let nextLow = 2, nextHigh = n;
    let addHigh = true;
    while (k > 1) {
        if (addHigh) {
            out.push(nextHigh);
            nextHigh--
        } else {
            out.push(nextLow);
            nextLow++
        }
        k--;
        addHigh = !addHigh
    }
    addHigh = !addHigh;
    while (nextLow <= nextHigh) {
        if (addHigh) {
            out.push(nextHigh);
            nextHigh--
        } else {
            out.push(nextLow);
            nextLow++
        }
    }
    return out
}

const constructArray = (n, k) => {
    if (k === 1) { return [...Array(n).keys()].map((_, i) => i + 1) }
    let out = [1];
    let nextLow = 2, nextHigh = n;
    while (k > 1) {
        out.push(nextHigh);
        nextHigh--;
        k--;
        if (k > 1) { out.push(nextLow); nextLow++; k-- }
    }
    let last = out[out.length - 1]
    let diff = last <= n / 2 ? 1 : -1;
    while (out.length < n) {
        last += diff;
        out.push(last);
    }
    return out
}

const tests = [
    { nk: [3, 1], out: [1, 2, 3] },
    { nk: [3, 2], out: [1, 3, 2] },
    { nk: [5, 2], out: [1, 5, 4, 3, 2] },
    { nk: [5, 3], out: [1, 5, 2, 3, 4] },
    { nk: [7, 1], out: ['any'] },
    { nk: [7, 2], out: ['any'] },
    { nk: [7, 3], out: ['any'] },
    { nk: [7, 4], out: ['any'] },
    { nk: [7, 5], out: ['any'] },
    { nk: [7, 6], out: ['any'] },
    { nk: [8, 1], out: ['any'] },
    { nk: [8, 2], out: ['any'] },
    { nk: [8, 3], out: ['any'] },
    { nk: [8, 4], out: ['any'] },
    { nk: [8, 5], out: ['any'] },
    { nk: [8, 6], out: ['any'] },
    { nk: [8, 7], out: ['any'] },
    { nk: [10,9], out: ['any'] }
];

tests.forEach((t, i) => {
    let res = constructArray(...t.nk);
    let diffs = []
    for (let i = 1; i < res.length; i++) { diffs.push(Math.abs(res[i] - res[i - 1])) }
    let uniques = new Set(diffs)
    console.log(
        'test', i, res, diffs, uniques.size === t.nk[1]
    )
})