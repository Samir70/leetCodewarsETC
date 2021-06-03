let base = 10**9 + 7
const multMod = (a, b) => {
    let out = 0;
    while (b > 0) {
        if (b%2) {out += a; out %= base}
        a *= 2; a %= base;
        b = b >> 1; 
    }
    return out
}
var maxArea = function(h, w, hoz, vert) {
    hoz.sort((a, b) => a - b);
    vert.sort((a, b) => a - b);
    let heights = [hoz[0]], widths = [vert[0]]
    hoz.push(h)
    for (let i = 1; i < hoz.length; i++) {heights.push(hoz[i] - hoz[i-1])}
    vert.push(w)
    for (let i = 1; i < vert.length; i++) {widths.push(vert[i] - vert[i-1])}
    // console.log(heights, widths)
    let height = Math.max(...heights), width = Math.max(...widths);
    return multMod(height, width)
};
