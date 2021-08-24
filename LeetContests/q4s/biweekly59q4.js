// TLE and a lot of memory!
const base = 10**9 + 7
var numberOfCombinations = function(num) {
    if (num[0] === '0') {return 0}
    let hash = {}, hash2 = {}
    
    const aGrtOrEqToB = (a, b) => {
        // neither a nor b start with '0'
        if (a === b) {return true}
        if (a.length > b.length) {return true}
        if (a.length < b.length) {return false}
        let key = [a, b].join('-')
        if (hash2[key] !== undefined) {return hash2[key]}
        // console.log({func:'compare', a, b})
        for (let i = 0; i < a.length; i++) {
            if (a[i] < b[i]) {hash2[key] = false; return false}
            if (a[i] > b[i]) {hash2[key] = true; return true}
        }
        // won't reach this return because a !== b
        hash2[key] = true
        return true
    }
    const helper = (str, minVal) => {
        let key = [str, minVal].join('-');
        if (hash[key] !== undefined) {return hash[key]}
        // console.log({str, minVal})
        let out = 1
        for (let i = minVal.length; i < str.length; i++) {
            if (str[i] === '0') {continue}
            let left = str.slice(0, i), right = str.slice(i)
            if (aGrtOrEqToB(left, minVal) && aGrtOrEqToB(right, left)) {
                out = (out + helper(right, left)) % base
            }
        }
        hash[key] = out
        return out
    }
    return helper(num, '0')
};
