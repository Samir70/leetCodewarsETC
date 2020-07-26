/**
 * String needs to be split so both parts have the same number of distinct characters
 * https://leetcode.com/problems/number-of-good-ways-to-split-a-string/
 */

var numSplits = function(s) {
    var setL = new Set();
    var setR = new Set();
    var tallyL = Array(s.length);
    var tallyR = Array(s.length);
    var l = 0, r = s.length-1;
    while (l < s.length) {
        setL.add(s[l]); setR.add(s[r]);
        tallyL[l] = setL.size;
        tallyR[r] = setR.size;
        l++; r--;
    }
    var count = 0;
    for (var i =0; i < s.length - 1; i++) {
        if (tallyL[i] === tallyR[i+1]) {count++}
    }
    console.log(tallyL, tallyR)
    return count
};

// 86% users accepted; 66% submissions