/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
    this.small = new Heap() // will hold neg of input to become max heap
    this.large = new Heap()
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if (this.small.size === this.large.size) {
        // need to push into large the biggest number not already in large
        this.small.add(-num)
        this.large.add(-this.small.poll())
    } else {
        // large will be large
        // push into small the smallest not already in small
        this.large.add(num)
        this.small.add(-this.large.poll())
    }
    // console.log('small and large:', this.small.arr, this.large.arr)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.small.size === this.large.size) {
        // at least two elements added to achieve this
        let a = -this.small.peek(), b = this.large.peek();
        return (a+b)/2
    } else {
        // median is smallest of large
        return this.large.peek()
    }
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */