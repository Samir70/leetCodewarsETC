// 404ms = off the chart slow!
// https://leetcode.com/problems/count-vowels-permutation/
var countVowelPermutation = function (n) {
    let len = 1;
    let preTally = {}
    let vowels = 'aeiou';
    for (let v of vowels) { preTally[v] = 1n }
    let options = {
        a: 'e', e: 'ai', i: 'aeou', o: 'iu', u: 'a'
    }
    while (len < n) {
        len++;
        let tally = {}
        for (let v of vowels) {
            for (let newEnd of options[v]) {
                tally[newEnd] = (tally[newEnd] || 0n) + preTally[v]
            }
        }
        preTally = { ...tally }
        // console.log(preTally)
    }
    let count = 0n;
    for (let v of vowels) { count += preTally[v] || 0n }
    return count % 1000000007n
};

const tests = [2, 5, 10, 55, 12345];
const outs = [10, 68, 1739, 83257022, 480007966];

tests.forEach((t, i) => console.log(
    'test', i, countVowelPermutation(t) == outs[i]
))