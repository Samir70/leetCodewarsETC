var searchRange = function(nums, target) {
    // find target
    let left = 0, right = nums.length - 1;
    let firstFound;
    while (left <= right) {
        let mid = Math.floor((left + right)/2)
        if (nums[mid] === target) {firstFound = mid; break}
        if (nums[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    if (firstFound === undefined) {return [-1, -1]}
    console.log(nums, target, 'found', left, firstFound,right)
    // find left
    let aTarget = firstFound;
    while (nums[left] !== target) {
        let mid = Math.floor((left + aTarget)/2);
        if (nums[mid] === target) {
            aTarget = mid
        } else {
            left = mid + 1
        }
    }
    // find right
    aTarget = firstFound;
    while (nums[right] !== target) {
        let mid = Math.floor((aTarget + right)/2) + 1;
        if (nums[mid] === target) {
            aTarget = mid
        } else {
            right = mid - 1
        }
    }
    return [left, right]
};

/**
 * sgallivan
 * var searchRange = function(N, T) {
    const find = (target, arr, left=0, right=arr.length) => {
        while (left <= right) {
            let mid = left + right >> 1
            if (arr[mid] < target) left = mid + 1
            else right = mid - 1
        }
        return left
    } 
    let Tleft = find(T, N)
    if (N[Tleft] !== T) return [-1,-1]
    return [Tleft, find(T+1, N, Tleft) - 1]
};
 */