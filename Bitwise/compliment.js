// don't reverse the leading zeros -- except for zero

var bitwiseComplement = function (N) {
    if (N === 0) { return 1 }
    let out = 0;
    let value = 1;
    while (N > 0) {
        if ((N & 1) % 2 === 0) {
            out += value
        }
        N = N >> 1;
        value *= 2
    }
    return out
};

