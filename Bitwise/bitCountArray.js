// Fastest was
var countBits = function(num) {
    let out = Array(num+1);
    out[0] = 0;
    for (let i = 1; i <= num; i++) {
        out[i] = 1 + out[i & (i - 1)]
    }
    return out
};

// But this may have been slower only because array wasn't full size from start
var countBitsNoBitManipulation = function(num) {
    let out = [0, 1]
    let cur = 1, fromStart = 0, lastPower2 = 2 ;
    while (cur<num) {
        if (fromStart === lastPower2) {fromStart = 0; lastPower2 *= 2} 
        out.push(1+out[fromStart]);
        fromStart++; cur++; 
    }
    return out.slice(0, num+1)
};
