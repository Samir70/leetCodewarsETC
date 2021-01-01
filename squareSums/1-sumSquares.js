// const { shortPaths } = require('./tests');
const allNumbers = arr =>
    [...arr.sort((a, b) => a - b)].filter((x, i) => x === i + 1).length === arr.length

const pairSumIsSquare = arr => {
    for (let i = 1; i < arr.length; i++) {
        let sqrt = Math.floor(Math.sqrt(arr[i] + arr[i - 1]));
        if (sqrt * sqrt !== arr[i] + arr[i - 1]) {
            console.log(arr[i - 1], '+', arr[i], '=', arr[i - 1] + arr[i], '!== square')
            return false
        }
    }
    return true
}

const squares = n => {
    let i = 5, sq = 4, lim = n + n;
    let out = [];
    while (sq < lim) {
        out.push(sq);
        sq += i; i += 2
    }
    return out.reverse()
}

const wholePath = (n, arr, used, sqs, last) => {
    if (arr.length === n) {return arr}
    if (last % 8 === 0) {console.log('added', last, arr.length)}
    for (let s of sqs) {
        let next = s - last;
        if (next > 0 && next <= n && !used.has(next)) {
            used.add(next)
            let outcome = wholePath(n, [...arr, next], used, sqs, next)
            if (outcome) {return outcome}
            used.delete(next)
        }
    }
    return false
}

const square_sums_row = n => {
    if (n === 1) { return [1] }
    if (n < 15 || [18, 19, 20, 21, 22, 24].includes(n)) { return false }
    let sqs = squares(n);
    console.log(n, sqs)
    for (let i = n; i > 0; i--) {
        let used = new Set()
        used.add(i);
        let outcome = wholePath(n, [i], used, sqs, i)
        if (outcome) {return outcome}
    }
    return false
}

[...Array(5).keys()].map(x=>x+50).forEach(x=>console.log(x+':'+square_sums_row(x)));