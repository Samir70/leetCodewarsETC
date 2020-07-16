const isSubSequence = (s, t) => {
    if (s.length === 0) { return true }
    if (s.length > t.length) { return false }
    var [ps, pt] = [0, 0];
    var look4 = s[0];
    while (pt < t.length) {
        if (look4 === t[pt]) {
            ps++;
            if (ps === s.length) { return true }
            look4 = s[ps]
        }
        pt++
    }
    return false
}

const tests = [
    { s: "abc", t: "ahbgdc", out: true },
    { s: "axc", t: "ahbgdc", out: false },
    { s: "abc", t: "ahjlkdjfgljlkdjfgbglkjlkjldkfjglkjlkjlkjgfdlkjdc", out: true },
    { s: "", t: "sdjfhlskdajfh", out: true },
    { s: "abcdef", t: "abc", out: false }
];

tests.forEach((t, i) => console.log('test', i, isSubSequence(t.s, t.t) === t.out))