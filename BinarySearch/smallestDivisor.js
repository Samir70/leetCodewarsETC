// binarySearach
const smallestDivisor = (nums, threshold) => {
    let big = Math.max(...nums);
    let small = 1;
    while (small < big) {
        let mid = small + Math.floor((big - small) / 2)
        let sum = nums.map(x => Math.ceil(x / mid)).reduce((a, c) => a + c, 0);
        console.log(sum, threshold, small, mid, big)
        // if (sum === threshold) { return mid }
        if (sum > threshold) {
            small = mid + 1
        } else {
            big = mid
        }
    }
    return small
}

const tests = [
    // { nums: [1, 2, 5, 9], threshold: 6, out: 5 },
    // { nums: [2, 3, 5, 7, 11], threshold: 11, out: 3 },
    // { nums: [19], threshold: 5, out: 4 },
    {
        nums: [81488, 78770, 69737, 14847, 36203, 85812, 62771, 25584, 40434, 55397, 95643, 48474, 63802, 63203, 69258, 16397, 62134, 68311, 48931, 4317, 488, 76613, 70301, 24052, 67069, 8018, 61725, 98992, 86206, 54407, 33175, 65597, 5215, 11866, 9420, 93851, 66858, 78097, 70255, 92021, 50353, 91451, 52417, 411, 81332, 27928, 51842, 83525, 74458, 10995, 18792, 14219, 31190, 86907, 412, 45731, 9730, 1258, 94589, 84673, 20469, 479, 71501, 68751, 18230, 77410, 41662, 9005, 72532, 36514, 5203, 528, 59746, 45580, 72611, 30386, 40609, 30783, 70776, 78765, 97187, 19997, 16257, 86367, 80891, 43219, 55020, 4753, 2785, 70141, 86103, 25092, 50595, 73151, 69139, 92893, 18011, 94848, 65111, 5657],
        threshold: 988,
        out: 5317
    }
];

tests.forEach((t, i) => console.log(
    'test', i, smallestDivisor(t.nums, t.threshold) === t.out
))