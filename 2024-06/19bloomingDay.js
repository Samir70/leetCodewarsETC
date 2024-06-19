/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const countBouquets = (flowers, day, bouquetSize) => {
  let count = 0, conseq = 0
  for (let n of flowers) {
    n <= day ? conseq++ : conseq = 0
    if (conseq === bouquetSize) {
      count++
      conseq = 0
    }
  }
  return count
}
var minDays = function (bloomDay, m, k) {
  if (m * k > bloomDay.length) { return -1 }
  let left = Math.min(...bloomDay)
  let right = Math.max(...bloomDay)
  let minDays = Infinity
  while (left <= right) {
    // console.log(`After day ${left}: ${countBouquets(bloomDay, left++, k)} bouquets`)
    let mid = left + Math.floor((right - left) / 2)
    let count = countBouquets(bloomDay, mid, k)
    // console.log({ left, right, mid, count })
    if (count >= m) {
      minDays = Math.min(minDays, mid)
      right = mid
      if (right === left) { return left }
    } else {
      left = mid + 1
    }
  }
  return minDays === Infinity ? -1 : left
};

const tests = [
  { args: [[1, 10, 3, 10, 2], 3, 1], out: 3 },
  { args: [[1, 10, 3, 10, 2], 3, 2], out: -1 },
  { args: [[7, 7, 7, 7, 12, 7, 7], 2, 3], out: 12 },
  { args: [[7, 7, 7, 7, 1000000000, 7, 7], 2, 3], out: 1000000000 },
];

tests.forEach((t, i) => {
  let res = minDays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});