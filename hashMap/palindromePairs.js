let memo = {}
const isPal = s => {
    if (memo[s] !== undefined) {return memo[s]}
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            memo[s] = false;
            return false
        }
        left++; right--
    }
    memo[s] = true;
    return true
}
var palindromePairs = function(words) {
    let hash = {}, out = [];
    for (let i = 0; i < words.length; i++) {hash[words[i]] = i}
    for (let i = 0; i < words.length; i++) {
        if (words[i] === '') {
            for (let w = 0; w < words.length; w++) {
                if (isPal(words[w]) && w !== i) {out.push([w, i], [i, w])}
            }
        }
        
        let rev = words[i].split('').reverse().join('');
        if (hash[rev] !== undefined && hash[rev] !== i) {
            out.push([i, hash[rev]])
        }
        // console.log('considering', words[i], rev, out)
        for (let j = 1; j < rev.length; j++) {
            if (isPal(rev.slice(0, j))) {
                let leftover = rev.slice(j)
                if (hash[leftover] !== undefined && i !== hash[leftover]) {out.push([i, hash[leftover]])}
            }
            if (isPal(rev.slice(j))) {
                let leftover = rev.slice(0,j);
                if (hash[leftover] !== undefined && i !== hash[leftover]) {out.push([hash[leftover], i])}
            }
        }
        // console.log(out)
    }
    return out
};