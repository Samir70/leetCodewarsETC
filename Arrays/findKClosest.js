var findClosestElements = function(arr, k, x) {
    if (x <= arr[0]) {return arr.slice(0, k)}
    if (x >= arr[arr.length - 1]) {return arr.slice(-k)}
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor((left+right)/2)
        if (arr[mid] < x) {
            left = mid+1
        } else {
            right = mid
        }
    }
    if (arr[left] !== x) {
        left = x - arr[left - 1] <= arr[left] - x ? left - 1 : left
        right = left
    }
    // console.log('starting at index', left)
    while (right - left + 1 < k) {
        let above = arr[right+1] - x, below = x - arr[left - 1]
        if (above < below) {
            right++
        } else {
            left--
        }
        // console.log('comparing', above, below)
        // console.log(left, right)
        // right won't have started this loop pointing to last element,
        // but if it gets to that point:
        if (right === arr.length - 1) {return arr.slice(-k)}
        if (left === 0) {return arr.slice(0, k)}
     }
    return arr.slice(left, left + k)
};

const tests = [
    { arr: [0, 1, 1, 1, 2, 3, 6, 7, 8, 9], k: 9, x: 4 },
    { arr: [0, 0, 1, 2, 3, 3, 4, 7, 7, 8], k: 3, x: 5 },
    { arr: [1, 3], k: 1, x: 2 }
]