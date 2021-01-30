const unpack = (arr, first) => {
    let out = [first];
    let used = new Set();
    used.add(first)
    for (let a of arr) {
        let n = a^out[out.length - 1]
        if (used.has(n) || n > arr.length+1 || n === 0) {return false}
        used.add(n)
        out.push(n)
    }
    return out
}
const decode = encoded => {
    let bcde = 0;
    let i = encoded.length-1;
    while (i > 0) {
        // console.log('xoring', encoded[i])
        bcde = bcde^encoded[i]
        i -= 2;
    }
    let first = bcde;
    for (let i = 1; i <= encoded.length+1; i++) {
        first = first ^ i
    }
    // console.log(bcde, first, unpack(encoded, first))
    return unpack(encoded, first)
}
// var decode = function(encoded) {
//     for (let f = 1; f <= encoded.length + 1; f++) {
//         let out = unpack(encoded, f)
//         if (out !== false) {return out}
//     }
//     return false
// };