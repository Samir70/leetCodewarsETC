// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/593/week-1-april-1st-april-7th/3696/
/**
 * @param {number} k
 */
 var MyCircularQueue = function(k) {
    this.q = Array(k);
    this.first = -1;
    this.last = -1;
    this.capacity = k;
    this.used = 0
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.used === this.capacity) {return  false}
    this.used++;
    if (this.first === -1) {this.first++}
    this.last++;
    if (this.last === this.capacity) {this.last = 0}
    this.q[this.last] = value
    return true
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.used === 0) {return false}
    if (this.used === 1) {
        this.used = 0;
        this.first = -1;
        this.last = -1;
        return true
    }
    this.used--;
    this.first++;
    if (this.first >= this.capacity ) {this.first = 0}
    return true
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.used === 0) {return -1}
    return this.q[this.first]
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.used === 0) {return -1}
    return this.q[this.last]
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this.used === 0
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return this.used === this.capacity
};