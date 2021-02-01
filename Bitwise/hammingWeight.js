const hammingWeight = n => {
    let count = 0;
    while (n > 0) {
        let msb = 1 << Math.floor(Math.log2(n))
        console.log(msb)
        n ^= msb;
        count++
    }
    return count
}

console.log(hammingWeight(33))