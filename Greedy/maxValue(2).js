const sumConsecNums = (a, b, c) => {
  // Give sum of consecutive numbers from a to b and down to c inclusive
  let numCount = b - a + 1;
  let sum = (numCount * (a + b)) / 2;
  numCount = b - c + 1;
  sum += (numCount * (b + c)) / 2;
  return sum - b; // we counted b twice
}

const maxValue = (n, index, maxSum) => {
  /**
   * Formula for sum of the array, with peak at index
   * As we make the peak taller, we end up with two tails around it
   * n - builtOn + sum(peak + leftTail + rightTail)
   */
  // console.log({n, index, maxSum})
  let left = 1;
  let right = maxSum + 1;
  let out = 0;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let a = index >= mid ? 1 : mid - index;
    let c = n - index > mid ? 1 : mid - (n - index) + 1;
    let builtOn = mid - a + mid - c + 1;
    let sum = n - builtOn + sumConsecNums(a, mid, c);
    console.log({a, mid, c, sum})
    if (sum <= maxSum) { out = Math.max(out, mid) }
    if (sum < maxSum) {
      left = mid + 1;
    } else {
      right = mid
    }
  }
  // console.log({ maxSum, left, out})
  return out
}

const tests = [
  // { args: [4, 2, 6], out: 2 },
  // { args: [4, 3, 7], out: 3 },
  // { args: [6, 1, 10], out: 3 },
  // { args: [6, 0, 10], out: 3 },
  // { args: [9, 3, 9], out: 1 },
  // { args: [46, 27, 6000], out: 142 },
  // { args: [8257285, 4828516, 850015631], out: 29014 },
  // { args: [685453290, 293811406, 689728311], out: 2068 },
  // { args: [7, 5, 30], out: 6 },
  { args: [1, 0, 24], out: 24 }
];

tests.forEach((t, i) => {
  let res = maxValue(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});