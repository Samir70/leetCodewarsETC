const quickSelect = (arr, k) => {
    var pivot = Math.floor(Math.random() * arr.length);
    console.log('arr.length, pivot is', arr.length, pivot, arr[pivot])
    var lower = [], other = [];
    for (var n of arr) {
        if (n < arr[pivot]) {
            lower.push(n)
        } else {
            other.push(n)
        }
    }
    if (lower.length === k) { return lower }
    if (lower.length === arr.length) {return lower.slice(0, k)}
    if (lower.length === 0) {return other.slice(0, k)}
    if (lower.length < k) {
        return lower.concat(quickSelect(other, k - lower.length))
    }
    return quickSelect(lower, k)
}

const { bigArray } = require('./bigArray'); //[...Array(500)].map(x => Math.floor(Math.random() * 10000))
console.log(bigArray, quickSelect(bigArray, 10))