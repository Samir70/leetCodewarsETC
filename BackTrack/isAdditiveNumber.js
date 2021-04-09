/**
 * @param {int} a 
 * @param {int} b 
 * @param {string} rest 
 */
const isFib = (a, b, rest) => {
    let next = (a + b).toString()
    if (rest.indexOf(next) !== 0) { return false }
    return next === rest ? true : isFib(b, a + b, rest.slice(next.length))
}

[
    { a: 1, b: 1, rest: '235813213455' },
    { a: 1, b: 1, rest: '0235813213455' },
    { a: 16, b: 23, rest: '3962101' }
].forEach((t, i) => console.log(
    'isFib test', i, t.a + '' + t.b + t.rest, isFib(t.a, t.b, t.rest)
))

/**
 * is num === [fib seq].join('')
 * @param {string} num 
 */
const isAdditiveNumber = num => {
    let lim = num[0] === '0' ? 2 : Math.ceil(num.length / 2);
    for (let i = 1; i < lim; i++) {
        let a = Number(num.slice(0, i))
        for (let j = i + 1; j < num.length; j++) {
            if (num[i] === '0' && j - i > 1) { break }
            let b = Number(num.slice(i, j));
            console.log(a, b, num.slice(j), isFib(a, b, num.slice(j)))
            if (isFib(a, b, num.slice(j))) { return true }
        }
    }
    return false;
}

const tests = [
    "112358", "199100199", "23163962101", "2316237", 
    "231162317", "101", "1023", "0235813", "0234234"
]
tests.forEach(t => console.log(
    'main test', t, isAdditiveNumber(t))
)