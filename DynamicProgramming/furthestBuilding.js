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

var furthestBuilding = function(heights, bricks, ladders) {
    let lim = heights.length - 1;
    let q = new Heap();
    for (let i = 0; i < lim; i++) {
        let diff = heights[i+1] - heights[i];
        if (diff > 0) {
            if (ladders > 0) {
                ladders--;
                q.add(diff)
            } else if (q.peek() !== null && diff > q.peek()) {
                // console.log('swapping', q.peek(), 'for', diff)
                q.add(diff);
                bricks -= q.poll()
            } else {
                // console.log('just using bricks, since', diff, '<=', q.peek())
                bricks -= diff
            }
            if (bricks < 0) {return i}
        }
    }
    return lim
};

const tests = [
    { heights: [4, 2, 7, 6, 9, 14, 12], bricks: 5, ladders: 1, out: 4 },
    { heights: [4, 12, 2, 7, 3, 18, 20, 3, 19], bricks: 10, ladders: 2, out: 7 },
    { heights: [14, 3, 19, 3], bricks: 17, ladders: 0, out: 3 },
    { heights: [7, 5, 13], bricks: 0, ladders: 0, out: 1 }
]