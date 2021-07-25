// 560ms, off the charts slow!
let doneOnce = false;
let goodNums = [0, 1];
let lim = 10**9;
const minOf = arr => arr.reduce((min, val) => val < min ? val : min, lim)
var findIntegers = function(n) {
    if (!doneOnce) {
        let stack = [1], min = 0;
        while (min < lim) {
            let newStack = []
            for (let s of stack) {
                if (s*2 <= lim) {newStack.push(s*2)}
                if (s % 4 === 0 && s+1 <= lim) {newStack.push(s + 1)}
            }
            // console.log('new good numbers:', newStack)
            min = minOf(newStack);
            // console.log(min, newStack.length, 'new numbers')
            goodNums = goodNums.concat(newStack)
            // console.log(goodNums.join(','))
            stack = [...newStack]
        }
        goodNums.sort((a, b) => a - b)
        doneOnce = true
    }
    let left = 0, right = Math.min(goodNums.length, n);
    while (left < right) {
        let mid = left + Math.floor((right - left)/2);
        if (goodNums[mid] < n) {
            left = mid+1
        } else {
            right = mid
        }
    }
    // console.log(goodNums.join(','), goodNums[left])
    return goodNums[left] === n ? left + 1 : left
};

console.log(findIntegers(5)); 5
console.log(findIntegers(50)); 21
console.log(findIntegers(100)); 34