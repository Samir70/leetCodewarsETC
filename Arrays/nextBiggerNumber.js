const sortRest = (d, i) => {
    let left = d.slice(0, i)
    let rest = d.slice(i).sort((a, b) => a - b);
    const max = 2147483647;
    let out = Number([...left, ...rest].join(''))
    return out > max ? -1 : out
}
var nextGreaterElementOld = function(n) {
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


//thought this would be faster, 
// but only when I used val in the search for swapWith rather than digits[i-1]
const  nextGreaterElement = n => {
    let digits = [...''+n].map(Number)
    let i = digits.length - 1;
    while (i > 0) {
        if (digits[i-1] < digits[i]) {break}
        i--
    }
    if (i === 0) {return -1}
    // console.log('need to swap at', i-1)
    let val = digits[i-1]
    let swapWith = i
    for (let j = i+1; j < digits.length; j++) {
        if (digits[j] > val && digits[j] < digits[swapWith]) {swapWith = j}
    }
    // console.log('swapWith digit at index', swapWith);
    [digits[i-1], digits[swapWith]] = [digits[swapWith], digits[i-1]];
    
    let left = digits.slice(0,i), rest = digits.slice(i).sort((a, b) => a-b)
    let out = Number([...left, ...rest].join(''))
    return out > 2147483647 ? -1 : out
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