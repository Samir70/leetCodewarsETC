// 68ms beats 96%
// as noted by lee215: ohOnes+oneOhs = s.length since each digit increments exactly one of the counters
var minOperations = function(s) {
    let ohOnes = 0, oneOhs = 0;
    for (let i = 0; i < s.length; i++) {
        if (i % 2) {
            // odd indexes, onOnes needs these to be ones
            s[i] === '1' ? oneOhs++ : ohOnes++
        } else {
            s[i] === '1' ? ohOnes++ : oneOhs++
        }
    }
    return Math.min(ohOnes, oneOhs)
};
