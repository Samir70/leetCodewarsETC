const countSubstrings = str => {
    let n = str.length;
    let count = n;
    for (let i = 1; i < n; i++) {
        let left = i-1, right = i+1
        while (left >= 0 && right < n && str[left] === str[right]) {
            left--; right++; count++
        }
        left = i-1; right = i
        while (left >= 0 && right < n && str[left] === str[right]) {
            left--; right++; count++
        }
    }
    return count
}

const tests = [
    { s: 'abc', out: 3 },
    { s: 'aaa', out: 6 },
    { s: 'abcb', out: 5 },
    { s: 'abcba', out: 7 }
];

tests.forEach((t, i) => console.log(
    'test', i, countSubstrings(t.s)
))