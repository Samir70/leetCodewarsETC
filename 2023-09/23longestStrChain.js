/**
 * sgallivan:
 * we can store the words in a set and only check the few possible predecessors
 *  while iterating from large to small. 
 * To aid in that, we can actually separate words into an array of sets (W) 
 * indexed by word length, so that we can directly access batches of words by their length.

(Note: As we iterate backward through W, if we find that W[i-1] is empty, 
    we don't need to process the words in W[i], 
    since there cannot possibly be a predecessor match.)

Then we can use a dynamic programming (DP) approach to eliminate some common subproblems. 
We can define a hashmap (dp) where dp[word] is the length of the longest chain 
ending at word found so far.

So at each word, we'll iterate through each of its predecessors (pred) 
and check the appropriate set in W for a match. 
If we find a match, we can update dp[pred] if dp[word] + 1 is better, 
increasing the chain by one. We should also separately keep track of the best chain length 
we've seen, so that once we reach the end, we can just return best.
 */
// bests 99%
var longestStrChain = function(words) {
    let byLen = Array(17)
    for (let i = 0; i < 17; i++) {byLen[i] = new Set()}
    for (let w of words) { byLen[w.length].add(w) }
    let bestEndingAt = {}, out = 1;
    for (let i = 16; i > 0; i--) {
        if (byLen[i-1].size === 0) {continue}
        for (let w of byLen[i]) {
            let chainLen = bestEndingAt[w] || 1
            for (let j = 0; j < w.length; j++) {
                let shorter = w.slice(0, j) + w.slice(j+1)
                // if the shorter word exists and is not already part of a longer chain
                if (byLen[i - 1].has(shorter) && chainLen >= (bestEndingAt[shorter] || 1)) {
                    bestEndingAt[shorter] = chainLen+1
                    out = Math.max(out, bestEndingAt[shorter])
                }
            }
        }
    }
    return out
};

