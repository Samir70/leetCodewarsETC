// 94ms beats 26%
var gcdOfStrings = function(str1, str2) {
    let cfs = []
    if (str1.length < str2.length) {
        [str1, str2] = [str2, str1]
    }
    let max = str1.length, min = str2.length;
    for (let i = 1; i*i <= min; i++) {
        if (max%i === 0 && min % i === 0) {
            cfs.push(i)
        }
        let j = min % i ? i : min / i
        if (j!==i && max%j === 0 && min % j === 0) {
            cfs.push(j)
        }
        // console.log({i, j, cfs})
    }
    cfs.sort((a, b) => a - b)
    // console.log({str1, str2, max, min, cfs})
    while (cfs.length) {
        let cf = cfs.pop()
        let f = str2.slice(0, cf)
        if (Array(min/cf).fill(f).join('') === str2) {
            if (Array(max/cf).fill(f).join('') === str1) {
                return f
            }
        }
    }    
    return ''
};

// 64 ms, faster than 97.69%
var gcdOfStrings = function(str1, str2) {
    if (str1 === str2) {return str1}
    if (str1.length < str2.length) {return gcdOfStrings(str2, str1)}
    if (!str1.startsWith(str2)) {return ""}
    
    return gcdOfStrings(str2, str1.replace(str2, ''))
};
