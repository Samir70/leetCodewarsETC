class Heap {
    // minHeap by default, use -ve for maxHeap
    constructor() {
        this.size = 0;
        this.arr = [null];
    }

    peek() { return this.size > 0 ? this.arr[1] : null }

    bubbleUp(child) {
        if (child > 1) {
            var parent = Math.floor(child / 2);
            if (this.arr[child] < this.arr[parent]) {
                var temp = this.arr[child];
                this.arr[child] = this.arr[parent];
                this.arr[parent] = temp
                this.bubbleUp(parent)
            }
        }
    }

    add(n) {
        this.size++
        this.arr[this.size] = n
        this.bubbleUp(this.size)
    }

    bubbleDown(parent) {
        var child = [this.arr[parent], parent];
        var le = 2 * parent, r = 2 * parent + 1;
        var left = le > this.size ? Infinity : this.arr[le]
        if (left < child[0]) { child = [left, le] }
        var right = r > this.size ? Infinity : this.arr[r];
        if (right < child[0]) { child = [right, r] }
        if (child[1] > parent) {
            var temp = this.arr[parent];
            this.arr[parent] = child[0];
            this.arr[child[1]] = temp;
            this.bubbleDown(child[1])
        }
    }

    replaceTop(val) {
        var out = this.arr[1];
        this.arr[1] = val;
        this.bubbleDown(1);
        return out;
    }
}


var KthLargest = function (k, nums) {
    this.data = new Heap();
    var i = 0;
    while (i < k && i < nums.length) { this.data.add(nums[i]); i++ }
    while (i < nums.length) {
        if (nums[i] > this.data.peek()) {
            this.data.replaceTop(nums[i])
        }
        i++
    }
    // console.log(this.data)
};

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
KthLargest.prototype.add = function (val) {
    if (val > this.data.peek()) {
        this.data.replaceTop(val)
    }
    console.log('considering', val,'data is now:', this.data)
    return this.data.peek()
};

var test = new KthLargest(2, [4, 3, 2, 1]);
console.log(test.add(6))
console.log(test.add(1))
console.log(test.add(62))
console.log(test.add(16))
console.log(test.add(26))
console.log(test.add(36))

var bigTest = Array(15000).map(x => Math.floor(Math.random() *10000) - 5000);
var test2 = new KthLargest(9999, bigTest);
var bigToAdd = Array(5000).map(x => Math.floor(Math.random() *10000) - 5000);
bigToAdd.forEach(t => test2.add(t));

const isMinHeap = (arr) => {
    var i = 1;
    while (i < arr.length) {
        var left = 2 * i, right = 2 * i + 1;
        if (arr[left] < arr[i]) { return false }
        if (arr[right] < arr[i]) { return false }
        i++
    }
    return true
}

console.log(isMinHeap(test2.data.arr))
