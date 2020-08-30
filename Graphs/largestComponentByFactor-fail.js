const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
    193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283,
    293, 307, 311, 313, 317
];

// fails for last input
const largestComponentSize = arr => {
    // for each prime that divides an element of arr, select a representative
    // a number < 100000 can have only one prime factor greater than 317
    // 3x7x1087 = 22827
    const primeToRep = new Map();
    const componentMap = [];
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
        // console.log(arr[i], primeFactors);
        let possComponent = []
        primeFactors.forEach(p => {
            if (!primeToRep.has(p)) {
                primeToRep.set(p, i);
                possComponent.push(i)
            } else {
                possComponent.push(primeToRep.get(p))
            }
        });
        let firstComponent = Math.min(...possComponent, Infinity);
        // console.log(arr[i], 'possComponent', possComponent, firstComponent)
        componentMap.push(firstComponent)
        primeFactors.forEach(p => {
            let connection = primeToRep.get(p);
            componentMap[connection] = Math.min(componentMap[connection], firstComponent);
        })
    }
    // console.log(primeToRep, componentMap);
    for (let i = 0; i < arr.length; i++) {
        let parent = componentMap[i];
        while (componentMap[parent] !== parent) { parent = componentMap[parent] }
        componentMap[i] = parent
    }
    // console.log('updated map', componentMap);
    let tally = new Map();
    let maxSize = 0;
    for (let parent of componentMap) {
        if (!tally.has(parent)) { tally.set(parent, 0) }
        tally.set(parent, tally.get(parent) + 1);
        maxSize = Math.max(maxSize, tally.get(parent))
    }
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