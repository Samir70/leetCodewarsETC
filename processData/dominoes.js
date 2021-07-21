// 204ms beats 12%
const strOf = (c, n) => Array(n).fill(c).join('')
var pushDominoes = function(dominoes) {
    let upright = 0, lastDir = 'L';
    let out = ''
    for (let d of dominoes) {
        if (d === '.') {
           upright++; 
           continue
        } 
        // console.log('saw', upright,'dots', 'now see', d)
        if (lastDir === 'L') {
            d === 'L' ? out += strOf(d, upright) : out += strOf('.', upright)
        } else {
            let half = upright % 2 ? (upright - 1) / 2 : upright / 2
            d === 'R' ? out += strOf(d, upright) : out += strOf('R', half) + strOf('.', upright%2) + strOf('L', half)
        }
        out += d
        upright = 0; lastDir = d
    }
    return out + (lastDir === 'R' ? strOf('R', upright) : strOf('.', upright))
};
