// beats 60%
var KthLargest = function (k, nums) {
    while (nums.length < k) {nums.push(-Infinity)}
    this.heap = [null, ...nums.sort((a, b) => a - b).slice(-k)];
    this.size = k
    // console.log('made a min heap', this.heap)
};

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
KthLargest.prototype.add = function (val) {
    function bubbleDown(h, parent) {
        var child = [h[parent], parent];
        var le = 2 * parent, r = 2 * parent + 1;
        var left = le > h.length ? Infinity : h[le]
        if (left < child[0]) { child = [left, le] }
        var right = r > h.length ? Infinity : h[r];
        if (right < child[0]) { child = [right, r] }
        if (child[1] > parent) {
            var temp = h[parent];
            h[parent] = child[0];
            h[child[1]] = temp;
            bubbleDown(h, child[1])
        }
    }
    if (val > this.heap[1]) {
        this.heap[1] = val;
        bubbleDown(this.heap, 1)
    }
    // console.log('added', val, 'to make heap:', this.heap)
    return this.heap[1]
};

var test = new KthLargest(5, [4, 3, 2, 1]);
console.log(test.add(6))
console.log(test.add(1))
console.log(test.add(62))
console.log(test.add(16))
console.log(test.add(26))
console.log(test.add(36))


var bigTest = Array(100000).map(x => Math.floor(Math.random() *10000) - 5000);
var test2 = new KthLargest(9999, bigTest);
var bigToAdd = Array(50000).map(x => Math.floor(Math.random() *10000) - 5000);
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

console.log(isMinHeap(test2.heap))
