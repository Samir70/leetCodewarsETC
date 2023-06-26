/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
// Look at using just one Heap in the answer
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
var totalCost = function (costs, k, candidates) {
  let left = candidates, right = costs.length - candidates;
  let cost = 0, found = 0;
  if (left >= right || costs.length === k) {
    costs.sort((a, b) => b - a)
    while (found < k) {
      cost += costs.pop()
      found++
    }
    return cost
  }
  let leftHeap = new Heap, rightHeap = new Heap;
  for (let n of costs.slice(0, left)) {
    leftHeap.add(n)
  }
  for (let n of costs.slice(right)) {
    rightHeap.add(n)
  }
  // console.log(leftHeap, rightHeap)
  while (found < k) {
    let leftCost = leftHeap.peek(), rightCost = rightHeap.peek()
    if (leftCost <= rightCost) {
      cost += leftHeap.poll()
      if (left < right) {
        leftHeap.add(costs[left]);
        left++
      }
    } else {
      cost += rightHeap.poll()
      if (left < right) {
        right--
        rightHeap.add(costs[right]);
      }
    }
    found++
    if (leftHeap.size === 0 || rightHeap.size === 0) { break}
    // console.log({ cost, leftHeap, rightHeap, left, right, found })
  }
  while (found < k) {
    cost += leftHeap.size > 0 ? leftHeap.poll() : rightHeap.poll()
    found++
  }
  // console.log({found, leftHeap, rightHeap})
  return cost
};

const tests = [
  { args: [[17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4], out: 11 },
  { args: [[1, 2, 4, 1], 3, 3,], out: 4 },
  { args: [[17, 12, 10, 2, 44, 4, 1, 7, 2, 11, 20, 8, 17, 23, 11, 3, 4, 22], 5, 4], out: 23 },
  { args: [[31, 25, 72, 79, 74, 65, 84, 91, 18, 59, 27, 9, 81, 33, 17, 58], 11, 2], out: 423 },
  { args: [[18, 64, 12, 21, 21, 78, 36, 58, 88, 58, 99, 26, 92, 91, 53, 10, 24, 25, 20, 92, 73, 63, 51, 65, 87, 6, 17, 32, 14, 42, 46, 65, 43, 9, 75], 13, 23], out: 223 },
  { args: [[57, 33, 26, 76, 14, 67, 24, 90, 72, 37, 30], 11, 2], out: 526 },
  { args: [[25, 65, 41, 31, 14, 20, 59, 42, 43, 57, 73, 45, 30, 77, 17, 38, 20, 11, 17, 65, 55, 85, 74, 32, 84], 24, 8], out: 1035 }
];

tests.forEach((t, i) => {
  let res = totalCost(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});