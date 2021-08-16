const largestPalCentreI = (s, i) => {
    let count = 1; // the ith character on its own
    let left = i - 1, right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        count += 2;
        left--; right++
    }
    return { len: count, start: left + 1, end: right - 1, pal: s.slice(left + 1, right) }
}

/**
 * 
 * @param {*} str (finds pals of odd length only, change ab to #a#b# if needed)
 */
const manacher = str => {
    let centre = 0, right = 0, left = 0;
    let out = Array(str.length).fill(0)
    for (let i = 0; i < str.length; i++) {
        let mirror = 2 * centre - i;
        if (i < right) { out[i] = Math.min(out[mirror], right - i) }
        let start = i - (1 + out[i])
        let end = i + (1 + out[i])
        while (start >= 0 && end < str.length && str[start] === str[end]) {
            out[i]++; start--; end++
        }
        if (i + out[i] > right) {
            centre = i; right = i + out[i]
        }
    }
    return out
}

var maxProduct = function (s) {
    let palRads = manacher(s); // the radius of each pal
    // console.log(s, palRads)
    let longestStartAfterIdx = Array(s.length).fill(1);
    let longestEndBeforeIdx = Array(s.length).fill(1);
    for (let i = 0; i < s.length; i++) {
        let radius = palRads[i]
        let len = 2 * radius + 1, left = i - radius, right = i + radius;
        longestStartAfterIdx[left] = Math.max(longestStartAfterIdx[left], len)
        longestEndBeforeIdx[right] = Math.max(longestEndBeforeIdx[right], len)
    }
    let max = longestEndBeforeIdx[s.length - 1];
    for (let i = s.length - 2; i >= 0; i--) {
        max -= 2;
        max = Math.max(longestEndBeforeIdx[i], max)
        longestEndBeforeIdx[i] = max
    }
    // console.log(longestEndBeforeIdx, longestStartAfterIdx)
    let maxProd = 1, bestLeft = 1, bestRight = longestStartAfterIdx[0];
    let i = 1;
    while (i < s.length) {
        bestRight -= 2;
        bestLeft = Math.max(bestLeft, longestEndBeforeIdx[i - 1]);
        bestRight = Math.max(bestRight, longestStartAfterIdx[i]);
        maxProd = Math.max(maxProd, bestLeft * bestRight)
        i++
    }
    return maxProd
};

const tests = [
    { s: "ababbb", out: 9 },
    { s: "zaaaxbbby", out: 9 },
    { s: "bababa", out: 9 },
    { s: "wtbptdhbjqsrwkxccxkwrsqjbhdtpbtw", out: 1 },
    { s: "rofcjxfkbzcvvlbkgcwtcjctwcgkblvvczbkfxjcfor", out: 41 },
    { s: "rofocjxfkbzcvvlbkgcwtcjctwcgkblvvczbkfxjcofor", out: 111 },
    { s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", out: 4355 },
    { s: "ggbswiymmlevedhkbdhntnhdbkhdevelmmyiwsbgg", out: 45 },
    { s: "ceedeeaeedceb", out: 9 }
]

tests.forEach((t, i) => console.log(
    'test', i, maxProduct(t.s) === t.out
))

const bigTest = Array(50000).fill('ab'); // 624999999?
console.log(maxProduct(bigTest))
const bigTest2 = Array(100000).fill('a'); // 2499999999
console.log(maxProduct(bigTest2))