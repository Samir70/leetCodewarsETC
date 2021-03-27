var secondHighest = function(s) {
    const digits = '0123456789';
    let tally = Array(10).fill(0);
    for (let c of s) {
        let i = digits.indexOf(c)
        if (i > -1) {tally[i]++}
    }
    let found = false;
    for (let i = 9; i >= 0; i--) {
        if (tally[i] > 0) {
            if (!found) {
                found = true
            } else {
                return i
            }
        }
    }
    return -1
};

// this was slower:
var secondHighest = function(s) {
    let first = -1, second = -1;
    for (let d of s) {
        if (/\d/.test(d)) {
            n = Number(d)
            if (n > first) {
                [first, second] = [n, first]
            } else if (first > n && n > second) {
                second = n
            }
        }
    }
    return second
};