const beauty = arr => {
    let min = Infinity, max = 0;
    for (let a of arr) {
        if (a < min && a > 0) {min = a}
        if (a > max) {max = a}
    }
    return min === Infinity ? 0 : max - min
}
// can be improved by modifiying initial tally to remove each i
var beautySum = function(s) {
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        let tally = Array(26).fill(0);
        for (let j = i; j < s.length; j++) {
            tally[s[j].charCodeAt(0) - 97]++
            sum += beauty(tally)
        }
    }
    return sum
};