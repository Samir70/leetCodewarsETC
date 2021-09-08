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
        let i = -1
        while (i < 10) {
            bit = i === -1 ? 0 : 1 << i
            i++
            if ((i!== 0) && (bit & mask)) {continue}
            dp[bit | mask] += count[c]*dp[bit]
            dp[bit | mask] %= base
            console.log([c, bit], dp[bit], mask, (bit | mask), dp[bit | mask])
        }
    }
    
    let sum = -1;
    for (let val of dp) {
        sum = (sum + val) % base
    }
    console.log({count1:count[1], sum})
    return count[1] > 0 ? (2**count[1])*sum : sum
};


// [18,28,2,17,29,30,15,9,12] => 19
// [4,2,3,15, 6, 6, 8, 13, 29, 24, 15, 1, 7] => 158
