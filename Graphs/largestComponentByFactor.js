const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
    193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
    293, 307, 311, 313, 317
];

// accepted with 2628ms
// optimise with union find
const largestComponentSize = arr => {
    if (arr.length === 0) {return 0}
    /**
     * For each number in arr:
     * -- find it's prime factors, record this
     * -- for each prime above, list its multiples
     * -- find the union of those multiple lists
     */
    const multiplesOfPrime = new Map();
    const primesOf = new Map();
    for (let i in arr) {
        let num = arr[i];
        let pIndex = 0;
        let primeFactors = [];
        while (primes[pIndex] < num) {
            if (num % primes[pIndex] === 0) {
                primeFactors.push(primes[pIndex]);
                while (num % primes[pIndex] === 0) { num /= primes[pIndex] }
            }
            pIndex++
        };
        if (num > 1) { primeFactors.push(num) }
        primesOf.set(i, primeFactors)
        for (let p of primeFactors) {
            if (!multiplesOfPrime.has(p)) {
                multiplesOfPrime.set(p, [i])
            } else {
                multiplesOfPrime.set(p, [...multiplesOfPrime.get(p), i])
            }
        }
    }

    // now find biggest union of those sets
    let i = 0;
    let maxSize = 1;
    while (i < arr.length) {
        // find a value that hasn't been processed
        while (arr[i] === 0 && i < arr.length) { i++ };
        let stack = [i];
        let members = new Set();
        while (stack.length > 0) {
            let cur = stack.pop();
            let pList = primesOf.get(''+cur) || [];
            // console.log(cur, 'plist', pList)
            for (let p of pList) {
                let multiples = multiplesOfPrime.get(p);
                multiples.forEach(m => {
                    if (arr[m] !== 0) {
                        members.add(arr[m]);
                        stack.push(m)
                        arr[m] = 0;
                    }
                })
            }
        }
        // console.log('members', members);
        maxSize = Math.max(maxSize, members.size)
        i++
    }
    // console.log(multiplesOfPrime, primesOf);
    return maxSize
}

const tests = [
    { in: [4, 6, 15, 35], out: 4 },
    { in: [20, 50, 9, 63], out: 2 },
    { in: [2, 3, 6, 7, 4, 12, 21, 39], out: 8 },
    { in: [22827, 16, 59785, 33, 49, 26, 58, 64], out: 4 },
    { in: [22827, 16, 59785, 33, 49, 25, 26, 58, 64, 14], out: 10 },
    { in: [99, 68, 70, 77, 35, 52, 53, 25, 62], out: 8 } // originally got 5
];

tests.forEach((t, i) => console.log(
    'test', i, largestComponentSize(t.in) === t.out
))