const eratosthenesSieve = (n) => {
    var integers = Array(n+1).fill(true);
    integers[0] = false;
    integers[1] = false;
    var primes = [2];
    var i = 2;
    var lastPrime = 2;
    const limit = Math.sqrt(n)
    while (i < limit) {
        for (var c = 2*lastPrime; c<n+1; c += lastPrime) { integers[c] = false }
        i++
        while (!integers[i]) {i++}
        lastPrime = i
        primes.push(lastPrime);
    }
    for (var p = i+1; p<n+1; p++) {
        if (integers[p]) {primes.push(p)}
    }
    return primes
}

// console.log(eratosthenesSieve(1000).join(','))

module.exports = {eratosthenesSieve}