var MinStack = function() {
    this.stack = []
    this.minList = [Infinity]
    return null
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    if (x <= this.minList[this.minList.length - 1]) {        
        this.minList.push(x)
    }
    return null
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let top = this.stack.pop()
    if (this.minList[this.minList.length - 1] === top) {
        this.minList.pop()
    }
    return null
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minList[this.minList.length - 1]
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */