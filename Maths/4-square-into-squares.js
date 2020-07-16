const sqDecomp = (n) => {
    if (n===0) { return [] }
    var k = Math.floor(Math.sqrt(n));
    while (k>0) {
        var candidate = [...sqDecomp(n-k*k), k*k];
        if (candidate.slice(1).every((x, i) => x>candidate[i])) { 
            return candidate
        }
        k--;
    }
    return candidate
}

// input will be squared, that number must be split into smaller, distinct, squares
// answer in ascending order.

const decompose = (n) => {
    var N = n*n, k = n-1;
    while (k**2 + (k+1)**2>N) {
        var candidate = [...sqDecomp(N - k*k), k*k];
        console.log(n, 'decomposes as', candidate);
        if (candidate.slice(1).every((x, i) => x>candidate[i])) { 
            return candidate.map(c=>Math.sqrt(c))
        }
        k--;
    }
    return null
}

const tests = [4, 7, 11, 21, 50, 99, 120, 24, 82, 23408, 435345]
tests.forEach(n => {
    // console.log(n, 'splits into', ...sqDecomp(n));
    console.log('**********best answer is:', decompose(n))
});