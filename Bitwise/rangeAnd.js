const rangeBitwiseAnd = (left, right) => {
    let count = 0;
    while (left && left !== right) {
        left >>= 1; right >>= 1
        count++
    }
    return left <<= count
}
// var rangeBitwiseAnd = function(left, right) {
//     let out = left
//     while (left <= right && out !== 0) {
//         out = out & left
//         left++
//     }
//     return out
// };