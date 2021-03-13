const numFactoredBinaryTrees = arr => {
    let hash = {}
    arr.sort((a, b) => a - b);
    hash[arr[0]] = 1
    for (let i = 1; i < arr.length; i++) {
        let count = 1;
        for (let key in hash) {
            let factor = Number(key)
            if (arr[i] % factor === 0) {
                count += hash[factor] * (hash[arr[i]/factor] || 0)
            }
        }
        hash[arr[i]] = count
    }
    // console.log(hash)
    let count = 0;
    for (let key in hash) {count = (count + hash[key]) % (10**9 + 7) }
    return count
}

const tests = [
    { arr: [2, 4], out: 3 },
    { arr: [2, 4, 5, 10], out: 7 },
    { arr: [2, 4, 5, 10, 20], out: 18 }
];

tests.forEach((t, i) => console.log(
    'test', i, numFactoredBinaryTrees(t.arr) === t.out
))