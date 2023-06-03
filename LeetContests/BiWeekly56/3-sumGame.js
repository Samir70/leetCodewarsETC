// Don't know state of this
const sumCount = s => {
    let sum = 0, count = 0; 
    for (let c of s) {
        c === '?' ? count++ : sum += Number(c)
    }
    return {sum, count}
}

const sumGame = s => {
    let mid = s.length / 2; // s guaranteed to be even length
    let left = sumCount(s.slice(0, mid)), right = sumCount(s.slice(mid))
    /**
     * if sum of each half is already the same, then 
     *   -- counts are same: whatever A adds B will add same to other side
     *   -- counts are diff: A works to exhaust one side with zeros
     */    
    if (left.sum === right.sum) {return left.count !== right.count}
    if (left.sum > right.sum) {
        let temp = {...right}
        right = {...left}
        left = {...temp}
    }
    // so, now, left is definitely least sum so far.
    // Alice either pushes the right beyond what left can reach, or 
    
    console.log(s, [left, right])
}

const tests = [
    { s: "5023", out: false },
    { s: "25??", out: true },
    { s: "?3295???", out: false }
]

tests.forEach((t, i) => console.log(
    'test', i, sumGame(t.s) === t.out
))