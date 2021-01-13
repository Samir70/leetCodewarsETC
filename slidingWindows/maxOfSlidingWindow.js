// wrong answer, doesn't remove the value leaving the window unless that value is the max
const bubbleUp = (arr, cur) => {
    let parent = Math.floor((cur - 1) / 2);
    if (arr[cur] > arr[parent]) {
        [arr[cur], arr[parent]] = [arr[parent], arr[cur]]
        if (parent > 0) { bubbleUp(arr, parent) }
    }
}
const bubbleDown = (arr, parent) => {
    var toBubble = [arr[parent], parent];
    var le = 2 * parent, r = 2 * parent + 1;
    var left = le > arr.length - 1 ? -Infinity : arr[le]
    if (left > toBubble[0]) { toBubble = [left, le] }
    var right = r > arr.length - 1 ? -Infinity : arr[r];
    if (right > toBubble[0]) { toBubble = [right, r] }
    if (toBubble[1] > parent) {
        var temp = arr[parent];
        arr[parent] = toBubble[0];
        arr[toBubble[1]] = temp;
        bubbleDown(arr, toBubble[1])
    }
}
const removeTop = (arr, k) => {
    arr[0] = arr[arr.length - 1];
    arr.pop();
    bubbleDown(arr, 0)
}
var maxSlidingWindow = function (nums, k) {
    let maxList = [], out = [];
    let i = 0, left = 0;
    while (i < nums.length) {
        maxList.push(nums[i]);
        bubbleUp(maxList, maxList.length - 1);
        if (i >= k - 1) {
            out.push(maxList[0]);
            if (nums[left] === maxList[0]) { removeTop(maxList, k) }
            left++
        }
        console.log(maxList)
        i++;
    }
    return out
};

const tests = [
    { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, out: [3, 3, 5, 5, 6, 7] },
    { nums: [1, 3, 1, 2, 0, 5], k: 3, out: [3, 3, 2, 5] },
    { nums: [9, 10, 9, -7, -4, -8, 2, -6], k: 5, out: [10, 10, 9, 2] }
];

tests.forEach((t, i) => console.log(
    'test', i, maxSlidingWindow(t.nums, t.k).join(',') === t.out.join(',')
))