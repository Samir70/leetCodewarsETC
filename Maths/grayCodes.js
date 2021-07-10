// 104ms beats 97%
var grayCode = function(n) {
    let cur = [0, 1], msb = 1
    while (n > 1) {
        n--;
        let next = [...cur];
        msb = msb << 1;
        for (let i = cur.length - 1; i >= 0; i--) {
            next.push(msb+cur[i])
        }
        cur = [...next]
    }
    return cur
};