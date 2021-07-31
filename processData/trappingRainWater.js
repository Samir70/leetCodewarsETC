// 80ms, beats 80%
// there is a faster version where each height is read once.
var trap = function(height) {
    let fromLeft = [], fromRight = [];
    let maxL = 0, maxR = 0;
    for (let left = 0; left < height.length; left++) {
        let right = height.length - 1 - left;
        if (height[left] > maxL) {maxL = height[left]}
        if (height[right] > maxR) {maxR = height[right]}
        fromLeft.push(maxL - height[left])
        fromRight.push(maxR - height[right])
        // console.log([left, right], [maxL, maxR])
    }
    fromRight.reverse()
    // console.log(fromLeft, fromRight);
    let sum = 0;
    for (let i = 0; i < height.length; i++) {
        sum += Math.min(fromLeft[i], fromRight[i])
    }
    return sum
};