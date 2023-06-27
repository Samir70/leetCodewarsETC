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

var kSmallestPairs = function (nums1, nums2, k) {
  let out = []
  let sum = nums1[0] + nums2[0]
  let sumHash = {}
  sumHash[sum] = [[0, 0]]
  let sumsHeap = new Heap()
  sumsHeap.add(sum)
  let added = new Set()
  while (out.length < k && sumsHeap.size > 0) {
    let nextSum = sumsHeap.poll()
    let [a, b] = sumHash[nextSum].shift()
    // console.log({sumHash, a, b})
    out.push([nums1[a], nums2[b]])
    added.add(a + ',' + b)
    let nextPair1 = [a + 1, b], sum1 = nums1[a + 1] + nums2[b]
    let nextPair2 = [a, b + 1], sum2 = nums1[a] + nums2[b + 1]
    if (a + 1 < nums1.length && !added.has((a + 1) + ',' + b)) {
      sumsHeap.add(sum1);
      if (sumHash[sum1] === undefined) { sumHash[sum1] = [] }
      sumHash[sum1].push(nextPair1)
      added.add((a + 1) + ',' + b)
    }
    if (b + 1 < nums2.length && !added.has(a + ',' + (b + 1))) {
      sumsHeap.add(sum2);
      if (sumHash[sum2] === undefined) { sumHash[sum2] = [] }
      sumHash[sum2].push(nextPair2)
      added.add(a + ',' + (b + 1))
    }
  }
  return out
};

tests = [
  { args: [[1, 7, 11], [2, 4, 6], 3], out: [[1, 2], [1, 4], [1, 6]] },
  { args: [[1, 1, 2], [1, 2, 3], 2], out: [[1, 1], [1, 1]] },
  { args: [[1, 2], [3], 3], out: [[1, 3], [2, 3]] },
  // Gives different order
  // { args: [[1, 1, 2], [1, 2, 3], 10], out: [[1, 1], [1, 1], [2, 1], [1, 2], [1, 2], [2, 2], [1, 3], [1, 3], [2, 3]] }
];

tests.forEach((t, i) => {
  let res = kSmallestPairs(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});