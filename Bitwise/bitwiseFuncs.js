const countBits = (n) => n === 0 ? 0 : 1 + countBits(n & (n - 1));
const isPower4 = (n) => countBits(n) === 1 && countBits(n-1) % 2 === 0;
const hammingDist = (m, n) => countBits(m ^ n);
const bitCountArrayNaive = (n) => [...Array(n + 1).keys()].map(x => countBits(x));
const bitCountArray = (n) => {
    const arr = [0, 1, 1];
    var lastPower2 = 2;
    var extra = 0;
    while (lastPower2 + extra < n) {
        extra++
        if (extra === lastPower2) {
            lastPower2 *= 2;
            extra = 0;
            arr.push(1)
        } else {
            arr.push(arr[lastPower2] + arr[extra])
        }
    }
    return arr.slice(0, n + 1)
}


const test = (f, compare, testCount, random, maxInput) => {
    console.log('Function needs ' + f.length + ' arguments.');
    for (var i = 0; i < testCount; i++) {
        const a = random ? Math.floor(Math.random() * maxInput) : i;
        const b = random ? Math.floor(Math.random() * maxInput) : i + 1;
        switch (f.length) {
            case 2: {
                console.log(a, '= ' + compare(a));
                console.log(b, '= ' + compare(b));
                console.log('function: ' + f(a, b));
                break;
            }
            default: {
                console.log(a, '= ' + compare(a), 'function: ' + f(a));
                console.log('Same? ', compare(a)+'' === f(a)+'')
            }
        }
    }
}

const toBinary = (n) => n.toString(2)

// test(countBits, toBinary, 10, true, 10^^5)
// test(hammingDist, toBinary, 10, true, 10**5)

test(bitCountArray, bitCountArrayNaive, 5, true, 100)