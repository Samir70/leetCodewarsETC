// 76ms, 66%
// The more formulaic first attempt was 64ms beating 97%
const combinationSum3 = (k, n) => {
    let out = [];
    const completeSum = (partial, sum, last) => {
        // if you found an answer: put it in the list
        if (sum === n && partial.length === k) { out.push(partial) }
        // if it's now impossible to complete this, then bail by returning null
        if (sum >= n || partial.length >= k) { return null }
        let next = [2, 3, 4, 5, 6, 7, 8, 9].filter(x => x > last && sum + x <= n);
        for (let i of next) {
            let outcomeForI = completeSum([...partial, i], sum + i, i);
        }
        return null
    }

    for (let i = 1; i < 10; i++) {
        if (i <= n) {
            completeSum([i], i, i);
        }
    }
    return out
}


const tests = [
    { k: 3, n: 7, out: [[1, 2, 4]] },
    { k: 3, n: 9, out: [[1, 2, 6], [1, 3, 5], [2, 3, 4]] },
    { k: 1, n: 6, out: [[6]] }
];

tests.forEach((t, i) => console.log(
    'test', i, combinationSum3(t.k, t.n), 'should be', t.out
));