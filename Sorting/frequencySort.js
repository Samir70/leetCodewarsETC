var frequencySort = function (s) {
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

const tests = [
    { in: "tree", out: "eetr" },
    { in: "what happens if there's a space?", out: "     aaaaeeeeppphhhsssttnwifr'c?" },
    { in: "aAaccc", out: "cccaaA" }
];

tests.forEach(t => console.log('{in:"' + t + '", out:"' + frequencySort(t) + '"},'))