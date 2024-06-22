class Queue {
  constructor() {
    this.arr = []
    this.size = 0
    this.front = 0
  }
  popFront() {
    let out = this.arr[this.front]
    this.front++
    this.size--
    return out
  }
  peekFront() {
    return this.arr[this.front]
  }
  push(n) {
    this.arr.push(n)
    this.size++
  }
  length() {
    return this.size
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  let queue = new Queue(), [count, lastPopped] = [0, -1]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2) {
      queue.push(i)
    }
    if (queue.length() > k) {
      lastPopped = queue.popFront()
    }
    if (queue.length() === k) {
      count += queue.peekFront() - lastPopped
    }
  }
  return count
};

const tests = [
  { args: [[1, 1, 2, 1, 1], 3], out: 2 },
  { args: [[2, 1, 1, 2, 1, 1], 3], out: 3 },
  { args: [[2, 4, 6], 1], out: 0 },
  { args: [[2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2], out: 16 },
];

tests.forEach((t, i) => {
  let res = numberOfSubarrays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});