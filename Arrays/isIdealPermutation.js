// array will be permutation of 0..n-1
const isIdealPermutation = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i && arr[i] !== i - 1 & arr[i] !== i + 1) { return false }
    }
    return true
}

/**
 * 0, 1, 2, 3, 4, 5
 * 1, 0, 2, 3, 4, 5
 * 1, 0, 3, 2, 5, 4
 */

const tests = [
    { arr: [1, 0, 2], out: true }, // global = local = 1
    { arr: [1, 2, 0], out: false }, // global = 2, local = 1
    { arr: [0], out: true },
    { arr: [0, 1, 3, 2, 4, 6, 5], out: true }
]

tests.forEach((t, i) => console.log(
    'test', i, isIdealPermutation(t.arr) === t.out
))