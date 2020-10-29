/**
 * Given array of ints height
 * 
 * height[i] is the height of a vertical post
 * Assume the x-axis is solid. What is the max volume you can manage with two posts?
 */
const maxArea1 = height => {
    let left = 0, right = height.length - 1;
    let best = 0;
    while (left < right) {
        let smallest = Math.min(height[left], height[right]);
        let width = right - left;
        best = Math.max(best, smallest * width);
        if (height[left] === smallest) {
            left++
            while (height[left] < smallest) {left++}
        } else {
            right--
            while (height[right] < smallest) {right--}
        }
        if (left === -1) {left = right}
    }
    return best
}

// faster to just step through one at a time.
// beats nearly 80%
const maxArea2 = height => {
    let left = 0, right = height.length - 1;
    let best = 0;
    while (left < right) {
        let smallest = Math.min(height[left], height[right]);
        let width = right - left;
        best = Math.max(best, smallest * width);
        if (height[left] === smallest) {
            left++
        } else {
            right--
        }
    }
    return best
}

const maxArea = height => {
    let left = 0, right = height.length - 1;
    let best = 0;
    while (left < right) {
        best = Math.max(best, Math.min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return best
}

const tests = [
    { h: [1, 8, 6, 2, 5, 4, 8, 3, 7], out: 49 },
    { h: height = [1, 1], out: 1 },
    { h: [4, 3, 2, 1, 4], out: 16 },
    { h: [1, 2, 1], out: 2 }
];

tests.forEach((t, i) => console.log(
    'test', i, maxArea(t.h) === t.out
))