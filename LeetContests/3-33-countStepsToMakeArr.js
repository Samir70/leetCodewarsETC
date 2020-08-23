/**
 * Make an array starting with allZero of same length. Two operations allowed:
 * -- Add one to one element
 * -- double all the elements
 */

const {bigArray} = require('../Arrays/bigArrayBigNumbers');

// I had to limit the memo because otherwise I ran out of memory.
let memo = {};
const zeroToN = n => {
    if (n === 0) return [0, 0];
    if (memo[n] !== undefined) { return memo[n] }
    if (n % 2 === 0) {
        let needMore = zeroToN(n / 2);
        // memo seems ot have run out of memory
        out = [needMore[0], needMore[1] + 1];
        if (n < 10000) {
            memo[n] = out
        } else {
            return out
        }
    } else {
        let needTake = zeroToN(n - 1);
        out = [needTake[0] + 1, needTake[1]];
        if (n < 10000) {
            memo[n] = out
        } else {
            return out
        }
    }
    return memo[n]
}

var minOperationsOld = function (nums) {
    let needToAddOne = Array(nums.length);
    let needToDouble = Array(nums.length);
    for (let n = 0; n < nums.length; n++) {
        let need = zeroToN(nums[n])
        // console.log(need)
        needToAddOne[n] = need[0];
        needToDouble[n] = need[1]
    }
    let doubles = Math.max(...needToDouble);
    let adds = needToAddOne.reduce((a, b) => a + b, 0)
    return doubles + adds
};


//######################################
// Following Lee215's hint on bitcount

const countBits = n => n === 0 ? 0 : 1 + countBits(n&(n-1))
const minOpsWithBitCount = nums => {
    let maxLength = 0, bitCount = 0;
    for (let i = 0; i<nums.length; i++) {
        let binary = nums[i].toString(2);
        if (maxLength < binary.length) {maxLength = binary.length}
        let c = countBits(nums[i]);
        // console.log(binary, binary.length, 'max:', maxLength, 'count:', c)
        bitCount += c
    }
    return bitCount + maxLength - 1
}

//##########################
// Try sim without bitCount or recursion

const minOperations = nums => {
    // count the divides and subtracts separately
    // only need the max number of divides
    let divides = 0, subtracts = 0;
    for (var i = 0; i < nums.length; i++) {
        let n = nums[i];
        let localDivs = 0
        while (n > 0) {
            if (n%2 === 1) {
                subtracts++;
            }
            n = Math.floor(n/2);
            if (n > 0) {localDivs++}
        }
        divides = Math.max(divides, localDivs)
    }
    return subtracts+divides
}

const smallArray = [3,2,2,4]; // should have 7

console.log(minOperations(bigArray))
console.log(minOpsWithBitCount(bigArray))
console.log(minOpsWithBitCount(smallArray))
// bigArray output is 225738