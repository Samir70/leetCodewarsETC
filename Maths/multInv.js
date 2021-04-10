const contFrac = (a, b) => {
    if (a === b) { return [1] }
    if (a === 0) { return [] }
    let first = Math.floor(a / b)
    let rem = a - first * b
    return rem === 0 ? [first] : [first, ...contFrac(b, rem)]
}

const convergents = cf => {
    let top = cf[0], bottom = 1
    let out = [[top, bottom]];
    for (let i = 1; i < cf.length; i++) {
        top = i === 1 ? cf[i] * out[i - 1][0] + 1 : cf[i] * out[i - 1][0] + out[i - 2][0]
        bottom = i === 1 ? cf[1] : cf[i] * out[i - 1][1] + out[i - 2][1]
        out.push([top, bottom]);
    }
    return out
}

const multInv = (n, p) => {
    let cf = contFrac(n, p);
    let [x, y] = convergents(cf).slice(-2)[0];
    console.log(cf, x, y)
    return (y * n) < (x * p) ? p - y : y
}

const tests = [
    // [n, p, inv]
    // [2, 13, 7], [5, 23, 14], [7, 10, 3],
    [87, 10**9 + 7, 252873565],
    [1, 10**9 + 7, 1]
]

tests.forEach((t, i) => console.log(
    'test', i, t, multInv(t[0], t[1]) //=== t[2]
))