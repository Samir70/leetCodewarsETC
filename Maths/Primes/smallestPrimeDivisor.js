const smpDivisor = n => {
    var numbers = Array(n + 1).fill(0);
    numbers[0] = null;
    numbers[1] = null;
    numbers[2] = 2;
    var i = 2;
    var lastfound = 2
    var lim = Math.sqrt(n)
    while (i <= lim) {
        var c = 1
        while (c * lastfound <= n) {
            if (numbers[c * lastfound] === 0) { numbers[c * lastfound] = lastfound }
            c++
        }
        while (numbers[i] !== 0) { i++ }
        lastfound = i
        // console.log(i, numbers)
    }
    while (i <= n) {
        if (numbers[i] === 0) { numbers[i] = i }
        i++
    }
    return { smpDivisors: numbers, primes: numbers.filter((x, i) => x === i) }
}

console.log(smpDivisor(250))