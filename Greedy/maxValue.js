const maxValue = (n, index, maxSum) => {
  let toAdd = Math.max(index, n - index - 1);
  let out = toAdd + 1
  let sum = n + toAdd;
  let left = index;
  let first = out;
  while (left > 0) {
    first = toAdd;
    left--;
    toAdd--;
    sum += toAdd;
  }
  let right = index;
  let last = out;
  toAdd = Math.max(index, n - index - 1);
  while (right < n - 1) {
    right++
    last = toAdd;
    toAdd--;
    sum += toAdd;
  }
  console.log({first, last, sum, maxSum})
  if (sum <= maxSum) {
    toAdd = Math.floor((maxSum - sum) / n);
    return out + toAdd
  }
  if (sum > maxSum) {
    /**
     * imagine decrementing sum by n - 1, n-2, n-3, ...
     * eventually the left and right tails around the peak are equal and we must 
     * lower what we subtract by two at each iteration.
     * 
     * What is the sum of the decrements in the first stage?
     * That has max(fist, last) - 1 iterations
     */
    let iterationCount = Math.max(first, last) - 1;
    // sum of n - 1, n -2, ... n - iterationCount
    let toTake = (iterationCount * (n - 1 + n - iterationCount)) / 2;
    if (sum - toTake < maxSum) {
      // might have taken too much away
      let maxDiff = maxSum - sum;
      let left = 1, right = iterationCount;
      while (left < right) {
        let mid = (left + right) / 2;
        toTake = (mid * (n - 1 + n - mid)) / 2;
        if (toTake < maxDiff) {
          left = mid + 1;
        } else {
          right = mid
        }
      }
      left--;
      toTake = (left * (n - 1 + n - left)) / 2;
      sum -= toTake;
      out -= left;
    } else {
      sum -= toTake;
      out -= iterationCount;
    }
    console.log("Took away", toTake, {sum, maxSum})

    // Now we must take away two less than on previous iteration





    
    // let toTake = n - 1;
    // let count = 0;
    // let takeTwo = false;
    // while (sum > maxSum) {
    //   out--; count++;
    //   if (!takeTwo && (first - count <= 1) && (last - count <= 1)) { takeTwo = true }
    //   sum -= toTake;
    //   toTake -= takeTwo ? 2 : 1
    // }
  }
  return out
}

const tests = [
  { args: [4, 2, 6], out: 2 },
  { args: [4, 3, 7], out: 3 },
  { args: [6, 1, 10], out: 3 },
  { args: [6, 0, 10], out: 3 },
  { args: [9, 3, 9], out: 1 },
  { args: [46, 27, 6000], out: 142 },
  { args: [8257285, 4828516, 850015631], out: 29014 },
  { args: [685453290, 293811406, 689728311], out: 2068 }
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