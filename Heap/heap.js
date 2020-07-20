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

    poll() {
        var out = this.arr[1];
        this.arr[1] = this.arr[this.size];
        this.arr.pop()
        this.size--
        this.bubbleDown(1);
        return out;
    }
}

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


// tests
var h = new Heap;
var test = [6, 4, 9, 1, 3, 7, 4, 6, 3, 9, 1, 8, 6]
test.forEach(t => h.add(t))

console.log(h.arr, h.peek())
console.log('polling', h.poll());
h.add(10)
console.log(h.arr, h.peek())

var test2 = Array(1000).map(x => Math.floor(Math.random() * 5000))
test2.forEach(t => {
    h.add(t);
    h.poll()
    h.add(Math.floor(Math.random() * 5000));
})
h.poll()
console.log('is it a min heap?', isMinHeap(h.arr))
