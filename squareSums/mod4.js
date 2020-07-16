const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

// mod 4: if a+b = square, then (a, b) could be
// (0, 0) (0, 1) (1, 3) (2, 2) (2, 3)
// since squares are 0 or 1 mod 4

const highestSquare = (sqs, n, i) =>
    sqs.reduce((a, b) => b > i && b - i <= n ? b : a, 0)
// pair up as many 1s and 3s
const pairOdds = (n) => {
    const squares = reachableSquares(n).filter(x => x % 2 === 0);
    console.log('with 2 odd from 1..' + n + ' you can reach', squares);
    let targetSquare = highestSquare(squares, n, 1);
    let [left, right] = [1, targetSquare - 1];
    const oddPairs = []
    while (left < right) {
        oddPairs.push([left, right]);
        left += 2;
        right -= 2;
    }
    console.log(oddPairs)
    return oddPairs
}

// pairOdds(101);

const pairOdds101 = [
    [1, 99], [3, 97], [5, 95], [7, 93], [9, 91], [11, 89], [13, 87], [15, 85], [17, 83], [19, 81], 
    [21, 79], [23, 77], [25, 75], [27, 73], [29, 71], [31, 69], [33, 67], [35, 65], [37, 63], 
    [39, 61], [41, 59], [43, 57], [45, 55], [47, 53], [49, 51]
]; // misses 101, of course

const threeSquareDance = (n) => {
    let squaresIndance = [64, 100, 144, 169];
    let [p, q, r, t] = squaresIndance;
    let template = (a) => a < 1 ? [] : [p-a, a, q-a]
    let etalp = (a) => a<1?[] : [q-a, a, p-a];
    let used = new Set
    for (a = 1; a<32; a += 1) {
        let dance = template(a)
            .concat(template(p+q-r-a))
            .concat(etalp(q+r-(p+t)+a))
            .concat(etalp(t-2*(r-p)-a))
            .map(x => used.has(x) || x<0 || x > n ? '.' : x);
        dance.forEach(x => used.add(x))
        console.log(dance)
    }
}

threeSquareDance(145)