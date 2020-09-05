// 120ms 94%
// slower version (132ms 84%) used an array to contain primes, via primes.push(factor)
// a set might have been faster

var countPrimes = function(n) {
    let limit = Math.floor(Math.sqrt(n));
    let nums = Array(n+1).fill(false);
    let primecount = 0;
    let factor = 2
    while (factor <= limit) {
        primecount++
        let multiple = factor;
        while (multiple <= n) {
            nums[multiple] = true;
            multiple += factor
        }
        while (nums[factor]) {factor++}
    }
    while (factor <n) {
        if (!nums[factor]) {primecount++}
        factor++
    }
    return primecount
};
