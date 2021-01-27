const concatenatedBinary = n => {
    let out = 0;
    let base = 10 ** 9 + 7;
    let power = 1;
    for (let i = n; i > 0; i--) {
        let bits = [...i.toString(2)].reverse();
        for (let b of bits) {
            if (b === '1') {out = (out + power) % base}
            power = (power * 2) % base
        }
    }
    return out
}

const tests = [
    1, 3, 12
]

const outs = [
    1, 27, 505379714
]

tests.forEach((t, i) => console.log(
    'test', i, concatenatedBinary(t) === outs[i]
))