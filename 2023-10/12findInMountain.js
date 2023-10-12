/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
*/
function MountainArray(arr) {
  this.list = arr
};
MountainArray.prototype.get = function (index) {
  return this.list[index]
};
MountainArray.prototype.length = function () {
  return this.list.length
};

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function (target, mountainArr) {
  let n = mountainArr.length();
  const isPeak = i => {
    if (i === n - 1 || i == 0) { return false }
    let below = mountainArr.get(i - 1)
    let itself = mountainArr.get(i)
    let above = mountainArr.get(i + 1)
    return itself > below && itself > above
  }
  let left = 0, right = n - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (isPeak(mid)) {
      left = mid; right = mid;
    } else if (mountainArr.get(mid - 1) < mountainArr.get(mid)) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  let peak = left
  // console.log({ target, n, peak })
  left = 0, right = peak;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    let val = mountainArr.get(mid)
    if (val === target) { return mid }
    if (val < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  if (mountainArr.get(left) === target) { return left }
  left = peak + 1, right = n - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    let val = mountainArr.get(mid)
    if (val === target) { return mid }
    if (val > target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return mountainArr.get(left) === target ? left : -1
};

const tests = [
  { args: [[1, 2, 3, 4, 5, 3, 1], 3], out: 2 },
  { args: [[0, 1, 2, 4, 2, 1], 3], out: -1 },
  { args: [[1, 5, 2], 2], out: 2 },
  { args: [[0, 5, 3, 1], 1], out: 3 },
];

tests.forEach((t, i) => {
  let res = findInMountainArray(t.args[1], new MountainArray(t.args[0]));
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});