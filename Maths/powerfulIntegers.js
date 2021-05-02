var powerfulIntegers = function(x, y, bound) {
    let seen = new Set()
    let powersX = [1], p = x === 1 ? bound : 1
    let powersY = [1], q = y === 1 ? bound : 1
    while (p < bound) {
        p *= x
        powersX.push(p)
    }
    while (q < bound) {
        q *= y
        powersY.push(q)
    }
    for (let pX of powersX) {
        for (let pY of powersY) {
            let sum = pX + pY
            if (sum <= bound) {
                seen.add(sum)
            } 
        }
    }
    return Array.from(seen)
};
