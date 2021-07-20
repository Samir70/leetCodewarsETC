// 136ms
var threeEqualPartsSlow = function (arr) {
    // console.table(arr)
    let ones = arr.reduce((acc, val) => acc += val, 0)
    if (ones % 3) { return [-1, -1] }
    if (ones === 0) { return [0, arr.length - 1] }
    let target = ones / 3;
    let count = 0, leftEnd = 0, rightStart = 0;
    let i = 0;
    while (i < arr.length && count < target) { count += arr[i++] }
    leftEnd = i - 1; count = 0;
    while (i < arr.length && count < target) { count += arr[i++] }
    rightStart = i
    // each section has the correct number of ones, 
    // but we might need more zeros at the end of the first two sections
    i = arr.length - 1;
    // console.log(leftEnd, rightStart)
    while (arr[i] === 0) {
        if (arr[rightStart] !== 0 || arr[leftEnd + 1] !== 0) { return [-1, -1] }
        i--; leftEnd++; rightStart++
    }
    // console.log(leftEnd, rightStart)
    // check we have the same digits once leading zeros are removed
    let [a, b, c] = [0, leftEnd + 1, rightStart]
    while (arr[a] === 0) { a++ }
    while (arr[b] === 0) { b++ }
    while (arr[c] === 0) { c++ }
    // console.log(a, b, c)
    while (c < arr.length) {
        if (arr[a] === arr[b] && arr[b] === arr[c]) {
            a++; b++; c++
            // console.log([a, b, c])
        } else {
            // console.log('not equal:', [a, b, c].map(i => arr[i]))
            return [-1, -1]
        }
    }
    return [leftEnd, rightStart]
};

// 92ms, beats 71%
var threeEqualParts = function(arr) {
    let ones = 0;
    for (let n of arr) {if (n === 1) {ones++}}
    if (ones % 3 !== 0) {return [-1, -1]}
    if (ones === 0) {return [0, arr.length - 1]}
    let n = ones/3
    
    // figure out leftEnd and rightStart (i and j)
    let starts = [], count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            count++;
            if (count === 1) {starts.push(i)}
        }
        if (count === n) {count = 0}
    } 
    // console.log(arr)
    // console.log(starts)
    
    let [a, b, c] = starts
    while (c < arr.length) {
        if (a === starts[1] || b === starts[2]) {return [-1, -1]}
        if (arr[a] !== arr[b] || arr[b] !== arr[c]) {return [-1, -1]}
        a++; b++; c++
    }
    // console.log([a, b, c])
    return [a - 1, b]
};


const tests = [
    { arr: [1, 0, 1, 0, 1], out: [0, 3] },
    { arr: [1, 1, 0, 1, 1], out: [-1, -1] },
    { arr: [1, 1, 0, 0, 1], out: [0, 2] },
    { arr: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0], out: [3, 15] },
    { arr: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0], out: [-1, -1] },
    { arr: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], out: [-1, -1] },
    { arr: [1, 0, 1, 1, 0], out: [-1, -1] },
    { arr: [0, 0, 0, 0, 0], out: [0, 4] },
    { arr: [0,1,0,1,1,0,1,1,0,1], out: [3, 7]}
];

tests.forEach((t, i) => console.log(
    'test', i, threeEqualParts(t.arr).join(',') === t.out.join(',')
))
