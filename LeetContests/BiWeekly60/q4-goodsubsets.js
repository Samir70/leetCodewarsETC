const base = 10**9 + 7
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
const makeMask = n => {
    let out = 0, bit = 1
    for (let p of primes) {
        if (n % p === 0) {
            out += bit
        }
        bit = bit << 1
    }
    return out
}
var numberOfGoodSubsets = function(nums) {
    // console.log(primes.map(makeMask))
    // each prime is a single bit
    // largest poss value = 1024 - 1 if n is a multiple of all primes
    // but each number is less that 30, so can't have 29*2 let alone anything else
    let dp = Array(1024).fill(0)
    dp[0] = 1
    let count = Array(31).fill(0)
    for (let n of nums) {count[n]++}
    // console.log(count)
    for (let c = 2; c <= 30; c++) {
        if (count[c] === 0) {continue}
        if (c % 4 === 0 || c % 9 === 0 || c % 25 === 0) {continue}
        let mask = makeMask(c)
        for (let i = 0; i < 1024; i++) {
            if (i & mask) {continue}
            dp[i | mask] += count[c]*dp[i]
            dp[i | mask] %= base
            // console.log([c, i], dp[i], mask, (i | mask), dp[i | mask])
        }
    }
    
    let sum = -1;
    for (let val of dp) {
        sum = (sum + val) % base
    }
    // console.log({count1:count[1], sum})
    let oneFactor = (2n ** BigInt(count[1]) * BigInt(sum)) % BigInt(base)
    return count[1] > 0 ? oneFactor : sum
};


// [18,28,2,17,29,30,15,9,12] => 19
// [4,2,3,15, 6, 6, 8, 13, 29, 24, 15, 1, 7] => 158
// [10,11,5,1,10,1,3,1,26,11,6,1,1,15,1,7,22,1,1,1,1,1,23,1,29,5,6,1,1,29,1,1,21,19,1,1,1,2,1,11,1,15,1,22,14,1,1,1,1,6,7,1,14,3,5,1,22,1,1,1,17,1,29,2,1,15,10,1,5,7,1,1,1,30,1,30,1,21,10,1,1,1,1,1,2,6,5,7,3,1,1,19,29,1,7,13,14,1,5,26,19,11,1,1,1,1,1,1,1,1,22,15,1,1,13,1,17,1,1,1,13,6,1,10,1,1,17,1,1,3,14,7,17,1,13,1,1,1,1,1,11,1,1,6,1,1,1,1,1,2,1,30,2,26,1,1,14,1,26,29,30,1,13,21,1,1,14,21,1,23,1,15,23,21,1,30,19,19,1,10,23,3,3,17,22,2,26,1,11,1,23,1,1,1,15,1,1,13,1,1]
// => 520317213
