var searchInsert = function(nums, target) {
    var i = nums.findIndex(x => x>=target)
    return i === -1 ? nums.length : i
};

var binSearchInsert = (nums, target) => {
    var low = 0, high = nums.length - 1
    while (low<=high) {
        var mid = Math.floor(low+(high-low)/2);
        if (nums[mid] === target) {return mid}
        if (nums[mid] > target) {
            high = mid -1
        } else {
            low = mid + 1
        }
    }
    return low
}

// since we are told there will be no duplicates, this also works:
var searchInsert2 = function(nums, target) {
    let left = 0, right = nums.length;
    while (left < right) {
        let mid = left + Math.floor((right - left)/2);
        if (nums[mid] < target) {
            left = mid+1
        } else {
            right = mid
        }
    }
    return left
};

var tests = [
    {nums:[1, 3, 5, 6], target:5, out: 2},
    {nums:[1, 3, 5, 6], target:7, out: 4},
    {nums:[1, 3, 5, 6], target:2, out: 1},
    {nums:[1, 3, 5, 6], target:0, out: 0},
    {nums:[1, 3, 5, 6, 7], target:0, out: 0}
]

tests.forEach((t, i) => console.log('test', i, binSearchInsert(t.nums, t.target)===t.out))
