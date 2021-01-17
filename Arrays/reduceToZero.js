// use elements at end of nums to reduce x to zero.
const minOperations = (nums, x) => {
    let sum = 0;
    let ans = Infinity;
    let cumalitiveLeft = new Map();
    cumalitiveLeft.set(0, 0)
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        cumalitiveLeft.set(sum, i + 1);
        if (sum > x) { break }
        // no point carrying on, 
        // negative values are not allowed in nums so sum will not go down.
    }
    if (cumalitiveLeft.has(x)) { ans = cumalitiveLeft.get(x) };
    // console.log(cumalitiveLeft, ans)
    // start suming elements from right, 
    // check if the complement was found while suming from left
    sum = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        sum += nums[i];
        // console.log('rightSum is', sum, 'looking for', x - sum)
        if (cumalitiveLeft.has(x - sum)) {
            ans = Math.min(ans, nums.length - i + cumalitiveLeft.get(x - sum))
        }
        if (sum > x) { break }
        // no negative values to bring sum down
    }
    return ans === Infinity || ans > nums.length ? -1 : ans
};

// same with hash rather than map
const minOperations = (nums, x) => {
    let sum = 0;
    let ans = Infinity;
    let cumalitiveLeft = { 0: 0 }
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        cumalitiveLeft[sum] = i + 1;
        if (sum > x) { break }
        // no point carrying on, 
        // negative values are not allowed in nums so sum will not go down.
    }
    if (cumalitiveLeft[x] !== undefined) { ans = cumalitiveLeft[x] };
    // console.log(cumalitiveLeft, ans)
    // start suming elements from right, 
    // check if the complement was found while suming from left
    sum = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        sum += nums[i];
        // console.log('rightSum is', sum, 'looking for', x - sum)
        if (cumalitiveLeft[x - sum] !== undefined) {
            ans = Math.min(ans, nums.length - i + cumalitiveLeft[x - sum])
        }
        if (sum > x) { break }
        // no negative values to bring sum down
    }
    return ans === Infinity || ans > nums.length ? -1 : ans
};

const tests = [
    { nums: [1, 1, 4, 2, 3], x: 5, out: 2 },
    { nums: [1, 1], x: 3, out: -1 },
    { nums: [5, 6, 7, 8, 9], x: 4, out: -1 },
    { nums: [3, 2, 20, 1, 1, 3], x: 10, out: 5 }
]

tests.forEach((t, i) => console.log(
    'test', i, minOperations(t.nums, t.x) === t.out
))