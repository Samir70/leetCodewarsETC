const gcd = (a, b) => {
    if (b === 0 || a === b) { return a }
    if (a === 0) { return b }
    return a > b ? gcd(a % b, b) : gcd(a, b % a)
}

const tests = [
    { a: 75, b: 30, out: 15 },
    { a: 75, b: 0, out: 75 },
    { a: 64, b: 24, out: 8 },
    { a: 21, b: 125, out: 1 },
    { a: 13, b: 13, out: 13 }
];

tests.forEach((t, i) => console.log(
    'test', i, gcd(t.a, t.b) === t.out
))