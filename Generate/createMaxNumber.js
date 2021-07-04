// 100ms = fastest, beats 25% on memory 
// probably only 4 submissions in JS
// https://leetcode.com/problems/create-maximum-number/
const allMax = arr => {
    let out = [[...arr]]
    let lastStepUp = 0;
    while (arr.length > 1) {
        if (lastStepUp >= arr.length - 1) {
            arr.pop()
            out.push([...arr]);
            continue
        }
        while (lastStepUp + 1 < arr.length && arr[lastStepUp] >= arr[lastStepUp + 1]) { lastStepUp++ }
        arr.splice(lastStepUp, 1); lastStepUp -= lastStepUp > 0 ? 1 : 0
        out.push([...arr])
    }
    out.push([])
    return out.reverse()
}

// return true if b > a
const isBigger = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (b[i] !== a[i]) { return b[i] > a[i] }
    }
    return false // a === b
}

const merge = (a, b) => {
    if (a.length === 0) { return b }
    if (b.length === 0) { return a }
    let i = 0, j = 0, ans = [];
    // console.log('merging', a, b)
    while (i < a.length || j < b.length) {
        let next
        let x = 0;
        while (a[i + x] !== undefined && a[i + x] === b[j + x]) { x++ }
        let aVal = a[i+x] === undefined ? -1 : a[i+x]
        let bVal = b[j+x] === undefined ? -1 : b[j+x]
        if (aVal > bVal) {
            next = a[i]; i++
        } else {
            next = b[j]; j++
        }
        // if (next === undefined) {console.log('oops', [aVal, bVal], ans); break}
        ans.push(next)
        // console.log('merged', ans)
    }
    return ans
}

var maxNumber = function (nums1, nums2, k) {
    // minimum number needed to take from first
    let min = nums2.length >= k ? 0 : k - nums2.length
    let max = Math.min(nums1.length, k);
    let a = allMax(nums1), b = allMax(nums2);
    let ans = [0];
    // console.log('take', min, max, 'from first array')
    for (let i = min; i <= max; i++) {
        let posAns = merge(a[i], b[k - i])
        // console.log(a[i], b[k - i], posAns)
        if (isBigger(ans, posAns)) { ans = [...posAns] }
    }
    return ans
};

const tests = [
    { n1: [9, 3, 2, 1, 8, 7, 6], n2: [6, 3, 1, 8, 9, 3], k: 6, out: [9, 9, 8, 7, 6, 3] },
    { n1: [3, 4, 6, 5], n2: [9, 1, 2, 5, 8, 3], k: 5, out: [9, 8, 6, 5, 3] },
    {
        n1: [5, 7, 3, 2, 5, 6, 8, 7, 3, 3, 5, 6, 9, 0, 2, 3, 4, 5, 5, 7, 8, 8, 4, 3, 1, 6, 7, 7, 7, 4, 3, 2, 8, 9],
        n2: [1, 2, 3, 9, 8, 5, 6, 4, 9, 0, 0, 8], k: 14,
        out: [9, 9, 9, 8, 8, 8, 7, 7, 7, 4, 3, 2, 8, 9]
    },
    { n1: [6, 7], n2: [6, 0, 4], k: 5, out: [6, 7, 6, 0, 4] },
    { n1: [3, 9], n2: [8, 9], k: 3, out: [9, 8, 9] },

    // gave runtime error heap out of memory
    { n1: [3, 4, 8, 9, 3, 0], n2: [6, 1, 9, 1, 1, 2], k: 6, out: [] }
];

tests.forEach((t, i) => console.log(
    'test', i, maxNumber(t.n1, t.n2, t.k), 'should be', t.out
))