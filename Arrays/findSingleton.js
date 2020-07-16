const findSingleton = (arr) => {
    if (arr.length === 1) {return arr[0]}
    let m = (arr.length - 1)/2; // arr must have length odd
    if (arr[m] === arr[m+1]) { return m%2 ? findSingleton(arr.slice(0, m)) : findSingleton(arr.slice(m+2))}
    if (arr[m] !== arr[m-1]) { return arr[m]}
    return '?'
}

const findSingleton = arr => {
    if (arr.length === 1) { return arr[0] }
    var mid = (arr.length - 1) / 2;
    var [a, b, c] = [arr[mid - 1], arr[mid], arr[mid + 1]];
    if (arr.length % 4 === 1) {
        return a === b ? findSingleton(arr.slice(0, mid - 1))
            : b === c ? findSingleton(arr.slice(mid + 2)) : b
    }
    return a === b ? findSingleton(arr.slice(mid + 1)) : findSingleton(arr.slice(0, mid))
}

const tests = [
    [1, 1, 2], [2, 3, 3],
    [2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
    [1, 1, 2, 3, 3],
    [1, 2, 2, 3, 3],
    [1, 1, 2, 2, 3],
    [1, 1, 2, 2, 3, 4, 4],
    [0, 0, 1, 2, 2, 3, 3]
]

tests.forEach(t => console.log(t, findSingleton(t)))