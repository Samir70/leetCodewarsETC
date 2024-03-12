/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeZeroSumSublists = function (head) {
  let arr = [...head]
  let sums = { 0: -1 }, sum = 0
  let cumSum = []
  let keepInList = Array(arr.length).fill(true)
  const removeFromList = (start, end) => {
    // console.log("removing", { start, end })
    for (let i = start; i <= end; i++) {
      keepInList[i] = false
      if (cumSum[i] !== 0) {
        sums[cumSum[i]] = i === end ? i : undefined
      } 
      // else {
      //   sums[0] = i
      // }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
    cumSum.push(sum)
    // console.log({ sum, sums })
    if (sums[sum] !== undefined) {
      removeFromList(sums[sum] + 1, i)
    } else {
      sums[sum] = i
    }
  }
  let out = []
  for (let i = 0; i < arr.length; i++) {
    if (keepInList[i]) { out.push(arr[i]) }
  }
  return out
};

const tests = [
  { args: [[0, 0]], out: [] },
  { args: [[5, -5, 5]], out: [5] },
  { args: [[4, -5, 5]], out: [4] },
  { args: [[5, -5, 4]], out: [4] },
  { args: [[1, 2, -3, 3, 1]], out: [3, 1] },
  { args: [[1, 2, 3, -3, 4]], out: [1, 2, 4] },
  { args: [[1, 2, 3, -3, -2]], out: [1] },
  { args: [[5, -3, -4, 1, 6, -2, -5]], out: [5, -2, -5] },
  { args: [[-40, 40, 9, -2, 4]], out: [9, -2, 4] },
  { args: [[24, -38, -38, -6, 19]], out: [24, -38, -38, -6, 19] },
  { args: [[2, 2, -2, 1, -1, -1]], out: [2, -1] },
];

tests.forEach((t, i) => {
  // if (i !== 10) { return }
  let res = removeZeroSumSublists(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});