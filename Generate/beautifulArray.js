// https://leetcode.com/problems/beautiful-array/
var beautifulArray = function(n) {
    let out = [1];
    while (out.length < n) {
        let temp = []
        for (let v of out) { temp.push(2*v - 1) }
        for (let v of out) { temp.push(2*v) }
        out = [...temp]
    }
    return out.filter(x => x <= n)
};