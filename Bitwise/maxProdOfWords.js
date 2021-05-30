// https://leetcode.com/problems/maximum-product-of-word-lengths/
// should be a faster version using bit manipulation
// this beat 51%

var maxProduct = function(words) {
    words.sort((a, b) => b.length - a.length);
    let max = 0
    for (let i = 0; i < words.length; i++) {
        let toAvoid = new Set([...words[i]])
        for (let j = i+1; j < words.length; j++) {
            let overlap = false
            for (let c of words[j]) {if (toAvoid.has(c)) {overlap = true; break}}
            if (!overlap) {
                let prod = words[i].length * words[j].length
                if (prod > max) {max = prod}
            }
        }
    }
    return max
};
