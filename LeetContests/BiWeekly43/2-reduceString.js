const findScore = (str, x, y) => {
    let as = 0, bs = 0;
    let abs = 0, bas = 0;
    for (let s of str) {
        if (s === 'a') {
            as++
        } else if (as > abs) { abs++ }
    }
    for (let s of str) {
        if (s === 'b') {
            bs++
        } else if (bs > bas) { bas++ }
    }
    // bs used up in either abs or bas; some counted twice
    let out
    if (x > y) {
        out = abs * x + Math.min(bs - abs, as-abs) * y
    } else { out = bas * y + Math.min(bs - bas, as - bas) * x }
    // console.log(str, x, y, '-->', abs, bas, out)
    return out
}

const maximumGain = (s, x, y) => {
    let parts = s.split(/[^ab]/).filter(x => x.length > 1).map(word => findScore(word, x, y));
    return parts.reduce((a, c) => a + c, 0)
}

const tests = [
    { s: "cdbcbbaaabab", x: 4, y: 5, out: 19 },
    { s: "aabbaaxybbaabb", x: 5, y: 4, out: 20 },
    {
        s: "aabbrtababbabmaaaeaabeawmvaataabnaabbaaaybbbaabbabbbjpjaabbtabbxaaavsmmnblbbabaeuasvababjbbabbabbasxbbtgbrbbajeabbbfbarbagha",
        x: 8484, y: 4096, out: 198644
    }
]

tests.forEach((t, i) => console.log(
    'test', i, maximumGain(t.s, t.x, t.y), 'should be', t.out
))