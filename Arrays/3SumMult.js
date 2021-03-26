const nCm = (n, m) => {
    let out = 1;
    let c = 1;
    // if (m < n - m) { m = n - m }
    while (n > m) {
        out *= n;
        out /= c;
        n--; c++
    }
    return out
}
const threeSumMulti = (nums, target) => {
    let unique = new Set(nums)
    let sorted = [...unique].sort((a, b) => a - b);
    let len = sorted.length;
    if (len === 1) { return nCm(nums.length, 3) }
    let out = 0;
    let tally = {}
    for (let n of nums) { tally[n] = (tally[n] || 0) + 1 }
    // console.log(tally, sorted)
    if (len === 2) {
        let [a, b] = sorted;
        if (a + a + a === target) { return nCm(tally[a], 3) }
        if (a + a + b === target) { return nCm(tally[a], 2) * tally[b] }
        if (a + b + b === target) { return nCm(tally[b], 2) * tally[a] }
        if (b + b + b === target) { return nCm(tally[b], 3) }
    }
    for (let s = 0; s < len; s++) {
        let smallest = sorted[s];
        let m = tally[smallest] === 1 ? s + 1 : s;
        let b = len - 1;
        while (m <= b) {
            let mid = sorted[m], biggest = sorted[b]
            if (m === b && tally[mid] === 1) { b--; continue }
            if (s === m && m === b && tally[mid] === 2) { b--; continue }
            // console.log('looking at', smallest, mid, biggest)
            if (smallest + mid + biggest === target) {
                // console.log('Found', smallest, mid, biggest)
                if (s === m && m === b) { out += nCm(tally[mid], 3) }
                if (s === m && m !== b) { out += nCm(tally[mid], 2) * tally[biggest] }
                if (s !== m && m === b) { out += nCm(tally[mid], 2) * tally[smallest] }
                if (s !== m && m !== b) { out += tally[smallest] * tally[mid] * tally[biggest] }
                b--;
                m++
            } else {
                smallest + mid + biggest > target ? b-- : m++
            }
            // console.log('out:', out)
        }
    }
    return out
};

const tests = [
    { arr: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], target: 8, out: 20 },
    { arr: [1, 1, 2, 2, 2, 2], target: 5, out: 12 },
    { arr: [4, 4, 4, 4], target: 12, out: 4 },
    { arr: [4, 4, 4, 4, 4], target: 12, out: 10 },
    { arr: [1, 2, 3, 3, 1], target: 5, out: 2 },
    { arr: [3, 3, 2, 0, 2], target: 7, out: 2 }
];

tests.forEach((t, i) => console.log(
    'test', i, threeSumMulti(t.arr, t.target)
))