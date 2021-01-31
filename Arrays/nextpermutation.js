const swap = (a, b, arr) => [arr[a], arr[b]] = [arr[b], arr[a]]
const reverse = (start, end, arr) => {
    // console.log('reversing', start, end, arr)
    while (start < end) {
        swap(start, end, arr);
        start++; end--
    }
}
const nextPermutation = nums => {
    let toSwap = nums.length - 2;
    while (toSwap >= 0 && nums[toSwap] >= nums[toSwap+1]) {toSwap--}
    if (toSwap > -1) {
        let swapWith = nums.length - 1;
        while (nums[swapWith] <= nums[toSwap]) {swapWith--}
        swap(toSwap, swapWith, nums)
    }
    reverse(toSwap+1, nums.length-1, nums)
};