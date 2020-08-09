/**
 * 
 * @param {*} arr // strictly increasing, +ve ints
 * @param {*} k // positive int <= 1000
 */

var findKthPositive = function (arr, k) {
    console.log(arr, k)
    var index = 0, int = 1, missing = [];
    while (index < arr.length && missing.length < k) {
        if (int < arr[index]) {
            missing.push(int)
            int++;
            console.log('missing, index', missing, index)
        } else {
            int++
            index++
        }
    }
    while (missing.length < k) {
        missing.push(int)
        int++;
    }
    return missing[k-1]
};

var findKthPositive = function (arr, k) {
    console.log(arr, k)
    var low = 0, high = arr.length;
    while (low < high) {
        var mid = low + Math.floor((high-low)/2);
        console.log('lmh', low, mid, high)
        if (arr[mid] - mid  - 1 < k) {
            low = mid+1
        } else {
            high = mid
        }
    }
    console.log('lmh', low, mid, high)
    return low+k
}

/**
 * See also
 * 
        This: Kth Missing Positive Number
        Minimum Number of Days to Make m Bouquets
        Find the Smallest Divisor Given a Threshold
        Divide Chocolate
        Capacity To Ship Packages In N Days
        Koko Eating Bananas
        Minimize Max Distance to Gas Station
        Split Array Largest Sum
 */

const tests = [
    { arr: [2, 3, 4, 7, 11], k: 5, out: 9 },
    { arr: [1, 2, 3, 4], k: 2, out: 6 },
    { arr: [1, 2, 3, 4, 5], k: 2, out: 7 }
]

tests.forEach((t, i) => console.log(
    'test', i, findKthPositive(t.arr, t.k), 'should be', t.out
))