// took 232ms, it sorts the input string which can be long
var frequencySortSlow = function (s) {
    var tally = {}
    for (var c of s) {
        tally[c] = (tally[c] || 0) + 1
    }
    // sorting an array made from s passed but was very slow
    return Object.keys(tally)
        .sort((a, b) => tally[b] - tally[a])
        .reduce((acc, v) => acc + v.repeat(tally[v]), '')
};
// return [...s].sort((a, b) => 
// tally[a] === tally[b] ? b.charCodeAt(0) - a.charCodeAt(0) : tally[b] - tally[a]).join('')

// sorting the tallys' keys is faster
// 88ms beats 92%
var frequencySort = function(s) {
    let tally = {}
    for (let c of s) {
        if (tally[c] === undefined) {
            tally[c] = 1
        } else {
            tally[c]++
        }
    }
    let sorted = Object.keys(tally).sort((a, b) => tally[b] - tally[a])
    let out = ''
    for (let c of sorted) {
        out += c.repeat(tally[c])
    }
    return out
};

// consider ajna's
// https://leetcode.com/problems/sort-characters-by-frequency/discuss/786374/C%2B%2B-Frequency-Map-based-vs-Array-Solutions-Compared-and-Explained-~100-Time-~100-Space

const tests = [
    { in: "tree", out: "eetr" },
    { in: "what happens if there's a space?", out: "     aaaaeeeeppphhhsssttnwifr'c?" },
    { in: "aAaccc", out: "cccaaA" }
];

tests.forEach(t => console.log('{in:"' + t + '", out:"' + frequencySort(t) + '"},'))
