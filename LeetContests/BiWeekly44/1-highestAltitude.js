var largestAltitude = function(gain) {
    let sum = 0, max = 0;
    for (let g of gain) {
        sum += g;
        if (sum > max) {max = sum}
    }
    return max
};