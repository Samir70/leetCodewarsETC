/**
 * @param {string} s
 * @return {string[]}
 */
const validNums = s => {
    let out = []
    if (s.length === 1) {return [s]}
    if (s[s.length - 1] === '0') {return s[0] == '0' ? [] : [s]}
    if (s[0] === '0') {return [s[0]+'.'+s.slice(1)]}
    out.push(s)
    for (let i = 1; i < s.length; i++) {
        out.push(s.slice(0, i) + '.' + s.slice(i))
    }
    return out
}
var ambiguousCoordinates = function(s) {
    // console.log(validNums('123450'))
    // console.log(validNums('12345'))
    // console.log(validNums('012345'))
    let out = []
    s = s.slice(1, -1)
    for (let i = 1; i < s.length; i++) {
        let left = s.slice(0, i), right = s.slice(i)
        let leftValid = validNums(left), rightValid = validNums(right)
        if (leftValid.length === 0 || rightValid.length === 0) {
            continue
        }
        for (let lv of leftValid) {
            for (let rv of rightValid) {
                out.push('('+ lv + ', ' + rv + ')')
            }
        }
    }
    return out
};
