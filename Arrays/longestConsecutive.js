var longestConsecutive = function(nums) {
    let hash = {}, out = 0
    for (let n of nums) {
        if (hash[n] !== undefined) {continue}
        let below = hash[n-1], above = hash[n+1];
        if (below === undefined) {
            if (above === undefined) {
                hash[n] = {val: n, len:1}
            } else {
                while (above.anchor !== undefined) {above = hash[above.anchor]}
                hash[n] = {val:n, len:above.len + 1}
                hash[above.val] = {anchor: n}
            }
        } else {
            if (above === undefined) {
                while (below.anchor !== undefined) {below = hash[below.anchor]}
                hash[n] = {val: n, len:below.len+1}
                hash[below.val] = {anchor:n}
            } else {
                while (below.anchor !== undefined) {below = hash[below.anchor]}
                while (above.anchor !== undefined) {above = hash[above.anchor]}
                hash[n] = {val:n, len:below.len + above.len + 1}
                hash[above.val] = {anchor:n}
                hash[below.val] = {anchor:n}
            }
        }
        if (hash[n].len > out) {out = hash[n].len}
        // console.log('working on', n, hash)
    }
    return out
};

const tests = [
    { nums: [100, 4, 200, 1, 3, 2, 4], out: 4 },
    { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], out: 9 },
    { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1, -5, -4, -3, -2, -1, -6], out: 15 },
    { nums: [-3, 2, 8, 5, 1, 7, -8, 2, -8, -4, -1, 6, -6, 9, 6, 0, -7, 4, 5, -4, 8, 2, 0, -2, -6, 9, -4, -1], out: 7 }
]