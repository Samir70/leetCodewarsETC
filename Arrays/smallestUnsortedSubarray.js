// https://leetcode.com/problems/shortest-unsorted-continuous-subarray/solution/
const { bigtest } = require('./smallestUnsortedSubarray-data')

// O(n^2), [speed, mem] = [5%, 90%]
var findUnsortedSubarrayN2 = function (nums) {
    let left = 0;
    let minLeft = Infinity, maxRight = 0;
    while (left < nums.length) {
        let right = nums.length - 1
        while (left < right) {
            if (nums[left] > nums[right]) {
                minLeft = Math.min(minLeft, left)
                maxRight = Math.max(maxRight, right)
            }
            right--
        }
        left++
    }
    if (minLeft === Infinity) { return 0 }
    return maxRight - minLeft + 1
};

// O(n) [s, m] = [88%, 20%]
const findUnsortedSubarray1 = nums => {
    let stack = [0];
    let left = 1, minLeft = Infinity;
    while (left < nums.length) {
        if (nums[left - 1] < nums[left]) {
            stack.push(left)
        } else {
            while (stack.length && nums[stack[stack.length - 1]] > nums[left]) {
                minLeft = Math.min(minLeft, stack.pop())
            }
        }
        // console.log(left, stack, stack.map(s => nums[s]))
        left++
    }
    if (minLeft === Infinity) { return 0 }
    left = stack.length ? Math.min(...stack) : 0;
    let right = nums.length - 2, maxRight = -Infinity;
    stack = [nums.length - 1];
    while (right >= 0) {
        if (nums[right] < nums[right + 1]) {
            stack.push(right)
        } else {
            while (stack.length && nums[stack[stack.length - 1]] < nums[right]) {
                maxRight = Math.max(maxRight, stack.pop())
            }
        }
        // console.log(right, stack, stack.map(s => nums[s]))
        right--
    }
    right = stack.length ? stack[stack.length - 1] : nums.length - 1;
    // console.log('L, R', minLeft, maxRight)
    return maxRight - minLeft > 0 ? maxRight - minLeft + 1 : 0
}

// O(n) [s, m] = [71%, 72%]
const findUnsortedSubarray = nums => {
    if (nums.length < 2) { return 0 }
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] <= nums[left + 1]) { left++ }
        else { break }
    }
    if (left >= right) { return 0 }
    while (left < right) {
        if (nums[right] >= nums[right - 1]) { right-- }
        else { break }
    }
    // console.log(left, right)
    let min = nums[left], max = nums[right];
    for (let i = left; i <= right; i++) {
        min = Math.min(min, nums[i]);
        max = Math.max(max, nums[i]);
    }
    // console.log('max, min', max, min)
    while (left > 0 && nums[left - 1] > min) { left-- }
    while (right < nums.length - 1 && nums[right + 1] < max) { right++ }
    // console.log(left, right)
    return right - left > 0 ? right - left + 1 : 0
}

const tests = [
    { arr: [2, 6, 4, 8, 10, 9, 15], out: 5 },
    { arr: [2, 6, 4, 8, 1, 10, 9, 15], out: 7 },
    { arr: [1, 2, 3, 4], out: 0 },
    { arr: [1], out: 0 },
    { arr: [2, 1], out: 2 },
    { arr: [1, 2, 3, 3, 3], out: 0 },
    { arr: [1, 1, 1, 2, 3], out: 0 },
    { arr: [3, 3, 3, 2, 4], out: 4 },
    { arr: [1, 3, 2, 2, 2], out: 4 },
    { arr: [1, 3, 2, 4, 5], out: 2 },
    { arr: bigtest, out: 10000 }
]

// tests.forEach((t, i) => console.log(
//     'test', i, findUnsortedSubarrayN2(t.arr) === t.out
// ))
tests.forEach((t, i) => console.log(
    'test', i, findUnsortedSubarray(t.arr) === t.out
))


/**
 *
 can be done without stack to improve memory usage
 Algorithm

 The idea behind this approach is also based on selective sorting.
 We need to determine the correct position of the minimum and the maximum element in the
 unsorted subarray to determine the boundaries of the required unsorted subarray.

 To do so, in this implementation, we make use of a stackstackstack.
 We traverse over the numsnumsnums array starting from the beginning.
 As we go on facing elements in ascending order(a rising slope),
 we keep on pushing the elements' indices over the stackstackstack.
 This is done because such elements are in the correct sorted order(as it seems till now).
 As soon as we encounter a falling slope,
 i.e. an element nums[j]nums[j]nums[j] which is smaller than the element on
 the top of the stackstackstack, we know that nums[j]nums[j]nums[j] isn't at its correct position.

 In order to determine the correct position of nums[j]nums[j]nums[j],
 we keep on popping the elemnents from the top of the stackstackstack
 until we reach the stage where the element(corresponding to the index) on
 the top of the stackstackstack is lesser than nums[j]nums[j]nums[j].
 Let's say the popping stops when the index on stackstackstack's top is kkk.
 Now, nums[j]nums[j]nums[j] has found its correct position.
 It needs to lie at an index k+1k + 1k+1.

 We follow the same process while traversing over the whole array,
 and determine the value of minimum such kkk.
 This marks the left boundary of the unsorted subarray.
 Similarly, to find the right boundary of the unsorted subarray,
 we traverse over the numsnumsnums array backwards.
 This time we keep on pushing the elements if we see a falling slope.
 As soon as we find a rising slope,
 we trace forwards now and determine the larger element's correct position.
 We do so for the complete array and thus, determine the right boundary.
 */
