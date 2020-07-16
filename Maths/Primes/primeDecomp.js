const {eratosthenesSieve} = require('./listPrimes');

const smallPrimes = [2, 3, 5, 7];

const primeDecomp = n => {
    var m = n;
    const primeFactors = [];
    smallPrimes.forEach(p => {
        while (m % p === 0) {
            primeFactors.push(p);
            m /= p
        }
    });
    if (m > 1) {
        var morePrimes = eratosthenesSieve(m).slice(4);
        morePrimes.forEach(p => {
            while (m % p === 0) {
                primeFactors.push(p);
                m /= p
            }
        });
    }
    var factorList = {}
    primeFactors.forEach(p => {
        if (factorList[p] === undefined) {
            factorList[p] = 1
        } else {
            factorList[p]++
        }
    })
    return factorList
};

const factorCount = n => {
    var decomp = primeDecomp(n);
    var fCount = 1;
    for (var p in decomp) {
        fCount *= (decomp[p]+1)
    }
    return fCount
}

factorCount(100)

const tests = [
    1024, 81*125, 49*243*8, 71*4*25*121, 100
]

tests.forEach(t => console.log(t, 'decomp', primeDecomp(t), 'factorCount:', factorCount(t)))

const start = new Date().getTime();
console.log(primeDecomp(34757346));
const end = new Date().getTime();
console.log(end - start, 'milliseconds')