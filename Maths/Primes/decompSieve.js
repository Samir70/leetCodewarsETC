function* nextPrime(n) {
    var primes = [2];
}

const primeDecomp = n => {
    const lim = Math.floor(Math.sqrt(n))
    var ints = Array(lim).fill(true);
    var p = 2;
    var m = n;
    var factors = []
    while (p < Math.sqrt(m)) {
        while (m % p === 0) {
            m /= p
            factors.push(p);
        }
        var i = 2;
        while (i*p < Math.sqrt(m)) {
            ints[i*p] = false;
            i++
        }
        p++;
        while (!ints[p]) {p++}
    }
    factors.push(m)
    return factors
}

const tests = [
    1024, 81*125, 49*243*8, 71*4*25*121, 100
]

tests.forEach(t => console.log(t, 'decomp', primeDecomp(t)));//, 'factorCount:', factorCount(t)))

const start = new Date().getTime();
console.log(primeDecomp(34757873464));
const end = new Date().getTime();
console.log(end - start, 'milliseconds')