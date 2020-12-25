const sortRest = (d, i) => {
    let left = d.slice(0, i)
    let rest = d.slice(i).sort((a, b) => a - b);
    const max = 2147483647;
    let out = Number([...left, ...rest].join(''))
    return out > max ? -1 : out
}
var nextGreaterElement = function(n) {
    let digits = [...''+n].map(Number);
    let hash = Array(10).fill(-1)
    for (let i = digits.length - 1; i>=0; i--) {
        let d = digits[i]
        for (let c = d+1; c < 10; c++) {
            if (hash[c] !== -1) {
                [digits[i], digits[hash[c]]] = [digits[hash[c]], digits[i]]
                return sortRest(digits, i+1)
            }
        }
        if (hash[d] === -1) {
            hash[d] = i;
        } 
    }
    return -1
};


const tests = [
    122345, 122354, 122453, 122543,
    12, 21,
    1999999999, 2147483647
];
const outs = [
    122354, 122435, 122534, 123245,
    21, -1,
    -1, -1
]