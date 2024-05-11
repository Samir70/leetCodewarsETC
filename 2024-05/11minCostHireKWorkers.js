/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 * https://leetcode.com/problems/minimum-cost-to-hire-k-workers
 */
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
var mincostToHireWorkers = function (quality, wage, k) {
  let n = wage.length, totalCost = Infinity, curTotalQ = 0;
  let w2qRatio = []
  for (let i = 0; i < n; i++) {
    w2qRatio.push({ ratio: wage[i] / quality[i], q: quality[i] })
  }
  w2qRatio.sort((a, b) => a.ratio - b.ratio)
  let highestQWorkers = new Heap()
  for (let worker of w2qRatio) {
    highestQWorkers.add(-worker.q)
    curTotalQ += worker.q
    if (highestQWorkers.size > k) { curTotalQ += highestQWorkers.poll() }
    if (highestQWorkers.size === k) {
      totalCost = Math.min(worker.ratio * curTotalQ, totalCost)
    }
  }
  return totalCost
};

const { quality, wage, k } = require("./11bigtest")

const tests = [
  { args: [[10, 20, 5], [70, 50, 30], 2], out: 105 },
  { args: [[3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3], out: 30.66667 },
  { args: [quality, wage, k], out: 67078.64640 }
];

tests.forEach((t, i) => {
  let res = mincostToHireWorkers(...t.args);
  if (Math.abs(res - t.out) > 10 ** -5) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});