const verify = (arr, steps) => {
    let cur = [...arr];
    for (let s of steps) {
        let left = cur.slice(0, s).reverse(), right = cur.slice(s);
        cur = [...left, ...right]
    }
    return cur
}

// 308ms = off the chart slow
const pancakeSort = arr => {
    let steps = [];
    const len = arr.length;
    let cur = [...arr];
    for (let i = 0; i < arr.length; i++) {
        // flip to put 1 at start then put 1 at end; 
        // continue with 2, 3, 4...
        let step1 = cur.indexOf(i + 1) + 1, step2 = len - i;
        // if number is already in the right position, don't add anything
        if (step1 !== step2) {
            let left = cur.slice(0, step1).reverse(), right = cur.slice(step1);
            cur = [...left, ...right];
            left = cur.slice(0, step2).reverse(), right = cur.slice(step2);
            cur = [...left, ...right];
            steps.push(step1, step2);
        }
        console.log('to', arr, 'apply', steps, 'get', cur)
    }
    steps.push(len)
    console.log('final', steps)
    return steps
}

// O(n) solution involves swapping elements
// https://leetcode.com/problems/pancake-sorting/discuss/494417/Dew-It-or-True-O(n)-or-Explained-with-Diagrams

const tests = [
    { in: [3, 2, 4, 1], out: [2, 3, 4] },
    { in: [1, 2, 3], out: [] },
    { in: [5, 6, 1, 3, 2, 4], out: [3, 6, 2, 5, 3, 4, 1, 3, 1, 2, 6] }
];


tests.forEach((t, i) => console.log(
    'test', i, verify(t.in, pancakeSort(t.in))
))