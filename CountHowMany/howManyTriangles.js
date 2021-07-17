const aCb = (a, b) => {
    if (b > a) {return 0}
    if (b === 0 || b === a) {return 1}
    let out = 1;
    let n = a, d = 1;
    while (d <= b) {
        out *= n; out /= d
        d++; n--;
    }
    return out
}
var triangleNumber = function(nums) {
    if (nums.length < 3) {return 0}
    let tally = Array(1001).fill(0);
    let lim = 0;
    for (let n of nums) {tally[n]++; if (n > lim) {lim = n}}
    // let totals = [tally[0]]
    // for (let i = 1; i <= lim; i++) {totals.push(tally[i] + totals[i-1])}
    // console.log(tally.slice(0, lim+1).join(','))
    let count = 0;
    for (let a = 1; a <= lim; a++) {
        for (let b = a; b <= lim; b++) {
            // max and min for side c
            let max = Math.min(a + b  - 1, 1000), min = Math.max(b - a + 1, b)
            for (let c = min; c <= max; c++) {
                let waysA = 1, waysB = 1, waysC = 1
                if (a === b && b === c) {
                    waysA = aCb(tally[a], 3)
                } else if (a === b) {
                    waysA = aCb(tally[a], 2);
                    waysC = tally[c]
                } else if (b === c) {
                    waysA = tally[a]
                    waysB = aCb(tally[b], 2)
                } else if (a === c) {
                    waysA = aCb(tally[a], 2);
                    waysB = tally[b]
                } else {
                    waysA = tally[a];
                    waysB = tally[b];
                    waysC = tally[c]
                }
                count += waysA * waysB * waysC
            }
            // if (!count) {
            //     console.log(a, b, [min, max], count)
            // }            
        }
    }
    return count
};
