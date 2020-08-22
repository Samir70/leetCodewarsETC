/**
 * put evens first, then odds
 */
// from May
var sortArrayByParityPointers = function(A) {
    if (A.length < 2) {return A}
    var startPointer = 0, endPointer = A.length-1;
    while (startPointer < endPointer) {
        while (startPointer < endPointer && A[startPointer] % 2 === 0) {startPointer++}
        while (startPointer < endPointer && A[endPointer] % 2 === 1) {endPointer--}
        if (startPointer < endPointer) {
            var temp = A[startPointer];
            A[startPointer]  = A[endPointer];
            A[endPointer] = temp
        }
    }
    return A
};

// from August, was faster beating 64%
const sortArrayByParityPointers2 = arr => {
    let left = 0, right = arr.length-1;
    let out = [...arr]
    while (left<right) {
        while (left < right && out[left] % 2 === 0) {
            left++
        }
        while (left < right && out[right] % 2 === 1) {
            right--
        }
        if (left < right) {
            let temp = out[left];
            out[left] = out[right];
            out[right] = temp;
            left++
        }
    }
    return out
};

// fastest simply does:
var sortArrayByParity = function(A) {
    const even = [];
    const odd = [];
    
    for (let i = 0; i < A.length; i ++) {
        if (A[i] % 2 === 0) {
            even.push(A[i]);
        } else {
            odd.push(A[i]);
        }
    }
    return [...even,...odd];
};