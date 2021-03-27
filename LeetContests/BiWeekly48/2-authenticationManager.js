/**
 * @param {number} timeToLive
 */
 var AuthenticationManager = function(timeToLive) {
    this.timeToLive = timeToLive;
    this.tokens = {} // list expiry time of every token
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function(tokenId, currentTime) {
    this.tokens[tokenId] = currentTime + this.timeToLive;
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function(tokenId, currentTime) {
    if (this.tokens[tokenId] === undefined) {return}
    if (this.tokens[tokenId] > currentTime) {
        this.tokens[tokenId] = currentTime + this.timeToLive
    }
};

/** 
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function(currentTime) {
    let count = 0
    // console.log(this.tokens, currentTime)
    for (key in this.tokens) {
        if (this.tokens[key] > currentTime) {count++}
    }
    return count
};

/** 
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */