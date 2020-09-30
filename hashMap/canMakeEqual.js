/**
 * given target and arr, can arr be converted into target by reversing subArrays?
 * Basically: does each value have the same frequency in both arrays?
 * 
 * nb: could take advantage of constraint that all values are 1..1000
 * have a preMade array filled with zeros
 */

var canBeEqual = function(target, arr) {
    let hash = new Map();
    for (let t of target) {
        if (hash.has(t)) {
            hash.set(t, hash.get(t) + 1)
        } else {
            hash.set(t, 1)
        }
    }
    // console.log(hash)
    for (let a of arr) {
        if (hash.has(a)) {
            hash.set(a, hash.get(a) - 1)
        } else {
            return false
        }
    }
    // console.log(hash)
    for (let [key, val] of hash) {
        if (val !== 0) {return false}
    }
    return true
};