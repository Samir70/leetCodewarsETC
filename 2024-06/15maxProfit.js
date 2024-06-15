class Heap {
  // minHeap by default, use -ve for maxHeap
  constructor() {
    this.size = 0;
    this.arr = [[null, null]];
  }

  peek() { return this.size > 0 ? this.arr[1] : null }

  bubbleUp(child) {
    if (child > 1) {
      var parent = Math.floor(child / 2);
      if (this.arr[child][1] < this.arr[parent][1]) {
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
    // console.log("bubbledown:", { parent, val: this.arr[parent] })
    var child = [this.arr[parent], parent];
    var le = 2 * parent, r = 2 * parent + 1;
    var left = le > this.size ? [null, Infinity] : this.arr[le]
    if (left[1] < child[0][1]) { child = [left, le] }
    var right = r > this.size ? [null, Infinity] : this.arr[r];
    if (right[1] < child[0][1]) { child = [right, r] }
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
    if (this.size > 0) { this.bubbleDown(1) }
    return out;
  }
}
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
// faster submissions didn't bother with a heap
var findMaximizedCapital = function (k, w, profits, capital) {
  let projects = []
  for (let i = 0; i < profits.length; i++) {
    projects.push([capital[i], -profits[i]])
  }
  projects.sort((a, b) => a[0] - b[0])
  // console.log(projects)
  let doable = new Heap(), idx = 0
  while (k > 0) {
    k--
    // put doable projects into heap
    while (idx < projects.length && projects[idx][0] <= w) {
      doable.add(projects[idx++])
    }
    // console.log({ k, idx, doable })
    if (doable.size === 0) { break }
    let todo = doable.poll()
    w -= todo[1]
    // console.log({ todo, w })
  }
  return w
};

const tests = [
  { args: [2, 0, [1, 2, 3], [0, 1, 1]], out: 4 },
  { args: [3, 0, [1, 2, 3], [0, 1, 2]], out: 6 },
  { args: [1, 0, [1, 2, 3], [1, 1, 2]], out: 0 },
  { args: [4, 3, [4, 3, 6, 5, 4, 23, 22, 40, 49], [1, 2, 4, 5, 9, 13, 15, 39, 41]], out: 58 },
];

tests.forEach((t, i) => {
  let res = findMaximizedCapital(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});