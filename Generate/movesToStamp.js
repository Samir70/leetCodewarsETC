const matchable = (s, sub, i) => {
    let starCount = 0;
    for (let j = 0; j < sub.length; j++) {
        if (s[i + j] === '*') { starCount++; continue }
        if (s[i + j] === sub[j]) { continue }
        return false
    }
    return starCount === sub.length ? false : true
}

const mask = (s, i, l) => {
    let out = [...s];
    for (let j = 0; j < l; j++) { out[i + j] = '*' }
    return out.join('')
}

const movesToStamp = (stamp, target) => {
    if (stamp === target) { return [] }
    let makeChange = true;
    let last = target.length - stamp.length, sLen = stamp.length;
    let out = [];
    while (makeChange) {
        makeChange = false;
        for (let i = 0; i <= last; i++) {
            if (matchable(target, stamp, i)) {
                out.push(i);
                target = mask(target, i, sLen)
                // console.log(target)
                makeChange = true
            }
        }
    }
    for (let i = 0; i < target.length; i++) {
        if (target[i] !== '*') { return [] }
    }
    return out.reverse()
}

const tests = [
    { target: "aabccbabc", stamp: "abc", out: [4, 0, 6, 2, 1] },
    { stamp: "abca", target: "aabcaca", out: [3, 0, 1] }
]

tests.forEach((t, i) => console.log(
    'test', i, movesToStamp(t.stamp, t.target)
))