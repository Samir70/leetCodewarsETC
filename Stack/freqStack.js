var FreqStack = function() {
    this.tally = {}
    this.entriesWithFreqI = [[]];
    return null
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function(x) {
    this.tally[x] = (this.tally[x] || 0) + 1
    if (this.entriesWithFreqI[this.tally[x]] === undefined) {
        this.entriesWithFreqI[this.tally[x]] = [x]
    } else {
        this.entriesWithFreqI[this.tally[x]].push(x)
    }
    return null
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
    let mostFreq = this.entriesWithFreqI.length - 1;
    let out = this.entriesWithFreqI[mostFreq].pop()
    if (this.entriesWithFreqI[mostFreq].length === 0) {
        this.entriesWithFreqI.pop()
    }
    this.tally[out]--
    return out
};

/** 
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 */