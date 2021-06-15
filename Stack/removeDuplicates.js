// faster
const removeDuplicates1 = (s, k) => {
    let out = '';
    let prev = null, stack = []
    for (let c of s) {
        out += c;
        if (prev === null) {
            prev = { letter: c, count: 1 }
        } else {
            if (prev.letter === c) {
                prev.count++
            } else {
                stack.push(prev)
                prev = { letter: c, count: 1 }
            }
        }
        if (prev.count === k) {
            out = out.slice(0, -k)
            prev = stack.length ? stack.pop() : null
        }
        // console.log(out, prev, stack)
    }
    return out
}

// via lee215
// slower, 
var removeDuplicates = function(s, k) {
    let stack = [];
    cur = ['#',0];
    for (let c of s) {
        if (c === cur[0]) {
            cur[1]++;
            if (cur[1] === k) {
                cur = stack.length ? stack.pop() : ['#', 0]
            }
        } else {
            stack.push(cur);
            cur = [c, 1]
        }
    }
    if (cur[0] !== '#') {stack.push(cur)}
    // console.log(stack)
    stack.shift()
    let out = ''
    for (let [c, i] of stack) {
        while (i > 0) {out += c; i--}
    }
    return out
};


const tests = [
    { s: "abcd", k: 2, out: "abcd" },
    { s: "deeedbbcccbdaa", k: 3, out: "aa" },
    { s: "pbbcggttciiippooaais", k: 2, out: "ps" },
    { s: "yfttttfbbbbnnnnffbgffffgbbbbgssssgthyyyy", k: 4, out: "ybth" }
];

tests.forEach((t, i) => console.log(
    'test', i, removeDuplicates(t.s, t.k) === t.out
))