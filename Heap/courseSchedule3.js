/**
 * @param {number[][]} courses
 * @return {number}
 */
// 180ms
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
var scheduleCourse = function(courses) {
    courses.sort((a, b) => a[1] - b[1])
    let time = 0, count = 0;
    let used = new Heap();
    for (let [dur, dLine] of courses) {
        let temp = time + dur;
        if (temp <= dLine) {
            used.add(-dur);
            time = temp;
            count++
        } else {
            let biggestUsed = -used.peek()
            if (biggestUsed && biggestUsed > dur) {
                time = time - biggestUsed + dur
                used.poll()
                used.add(-dur)
                // console.log('swapped', [dur, dLine], 'for', biggestUsed)
            }
        }
        // console.log(time)
    }
    return count
};

const tests = [
{courses: [[100,200],[200,1300],[1000,1250],[2000,3200]], out:3},
{courses: [[1,2]], out:1},
{courses: [[3,2],[4,3]], out:0},
{courses: [[5,15],[3,19],[6,7],[2,10],[5,16],[8,14],[10,11],[2,19]], out:4}
]