class MonoQ {
  constructor() {
    this.arr = []
    this.size = 0
    this.front = 0
  }
  popFront(n) {
    if (this.arr[this.front] === n) {
      let out = this.arr[this.front]
      this.front++
      this.size--
      return out
    } else {
      return null
    }
  }
  peekFront() {
    return this.arr[this.front]
  }
  push(n, increasing = true) {
    if (increasing) {
      while (this.size > 0 && this.arr[this.arr.length - 1] > n) {
        this.arr.pop()
        this.size--
      }
    } else {
      while (this.size > 0 && this.arr[this.arr.length - 1] < n) {
        this.arr.pop()
        this.size--
      }
    }
    this.arr.push(n)
    this.size++
  }
  length() {
    return this.size
  }
}
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  let maxVals = new MonoQ(), minVals = new MonoQ()
  let [left, right] = [0, 0]
  let longest = 1
  while (right < nums.length) {
    let val = nums[right]
    maxVals.push(val, false); minVals.push(val)
    let [max, min] = [maxVals.peekFront(), minVals.peekFront()]
    while (left < right && max - min > limit) {
      val = nums[left++]
      // console.log({ val, max, min })
      maxVals.popFront(val); minVals.popFront(val)
      max = maxVals.peekFront()
      min = minVals.peekFront()
    }
    longest = Math.max(longest, right - left + 1)
    // console.log({ left, right, max, min })
    right++
  }
  return longest
};

const tests = [
  { args: [[8, 2, 4, 7], 4], out: 2 },
  { args: [[2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3], 4], out: 9 },
  { args: [[2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3], 2], out: 5 },
  /**
   * [2] [2]
   * [2,1] [1]
   * [2,2] [1,2]
   * [3] [1,2,3]
   * [4] [1,2,3,4] -> [4] [1,2,3,4] -> [4] [2,3,4]
   */
  { args: [[10, 1, 2, 4, 7, 2], 5], out: 4 },
  { args: [[4, 2, 2, 2, 4, 4, 2, 2], 0], out: 3 },
];
let arr = []
for (let i = 0; i < 1000; i++) {
  arr.push(Math.floor(Math.random() * 1000) + 1)
}
console.log(arr.join(","))

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = longestSubarray(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});