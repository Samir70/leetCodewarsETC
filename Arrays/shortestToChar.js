const shortestToChar = (s, c) => {
    let places = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === c) { places.push(i) }
    }
    let pointer = 0, out = [];
    for (let i = 0; i < s.length; i++) {
        // console.log(s[i], places, pointer)
        let a = Math.abs(i - places[pointer]);
        let b = places[pointer+1] ? Math.abs(i - places[pointer + 1]) : Infinity;
        // console.log(a, b)
        if (a < b) {
            out.push(a)
        } else {
            out.push(b);
            if (pointer < places.length - 2) { pointer++ }
        }
    }
    return out
}

const tests = [
    { s: "loveleetcode", c: "e", out: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0] },
    { s: "aaab", c: "b", out: [3, 2, 1, 0] }
];

tests.forEach((t, i) => console.log(
    'test', i, shortestToChar(t.s, t.c).join(',') === t.out.join(',')
))