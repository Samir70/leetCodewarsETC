/**
 * Sort into array [even, odd, even, odd, ...]
 */

// beats 35%
// there was faster code that did this, but us var i = 0.. rather var n of
const sortArrayByParityIIpointToOut = arr => {
    let out = Array(arr.length);
    let evenPointer = 0, oddPointer = 1;
    for (let n of arr) {
        if (n % 2 === 0) {
            out[evenPointer] = n;
            evenPointer += 2
        } else {
            out[oddPointer] = n;
            oddPointer += 2
        }
    }
    return out
};

// Beats 51%
const sortArrayByParityIIpointToIn = arr => {
    let out = [];
    let evenPointer = 0, oddPointer = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            while (arr[evenPointer] % 2 === 1) {
                evenPointer++
            }
            out.push(arr[evenPointer])
            evenPointer++
        } else {
            while (arr[oddPointer] % 2 === 0) {
                oddPointer++
            }
            out.push(arr[oddPointer]);
            oddPointer++
        }
    }
    return out
};

// fastest, poss fewer swaps
var sortArrayByParityII = function (A) {
    if (!A || !A.length || A.length % 2 != 0) return;

    let j;

    for (let i = 0; i < A.length; i++) {
        // if even on odd pos or odd on even pos
        // let's find new place for it
        if (i % 2 !== A[i] % 2) {
            // Starting from the next pos and advicing on 2 every step
            j = i + 1;
            while (j < A.length) {
                if (A[j] % 2 == i % 2) {
                    let temp = A[i];
                    A[i] = A[j];
                    A[j] = temp;
                    break;
                }
                j += 2;
            }
        }
    }

    return A;
};

// not sure why this was faster
var sortArrayByParityII = function (A) {
    var res = [];
    var even = 0;
    var odd = 1;
    A.forEach((e) =>
        e % 2 ? ((res[odd] = e), (odd += 2)) : ((res[even] = e), (even += 2))
    );
    return res;
};
