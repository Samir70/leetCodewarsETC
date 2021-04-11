// not intended sol. Close to TLE, but passed at 5492ms
var Fancy = function() {
    this.seq = []
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    this.seq.push(val)
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    for (let i = 0; i < this.seq.length; i++) {
        this.seq[i] += inc
    }
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    for (let i = 0; i < this.seq.length; i++) {
        this.seq[i] = (this.seq[i] * m) % (10**9 + 7)
    }
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) {return -1}
    return this.seq[idx]
};

/** 
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */