// split the square as low+high, the low counts the pairs
// 1+8, 2+7, 3+6, 4+5
// so 4 pairs
// for 16 all of 1, 2, 3, 4, 5, 6, 7, 8 pair up, but 8 pairs up with itself.
// so only count the first seven
// in general floor((sq-1)/2) pairs
// but that needs adapting if the sq is greater than n: 
// if we can only use the numbers 1..15 and are aiming for 25
// we can't get all 12
// the first pair is 10+15
// We have lost 9 pairs, only have those that start 10, 11, 12
// 3 pairs = 12 - (25-15 - 1)

const allPairs = (sq) => Math.floor((sq-1)/2)
const useablePairs = (sq, n) => sq <= n ? allPairs(sq) : allPairs(sq) + n +1 - sq;

const reachableSqs = (n) => {
    let i = 2;
    var toReturn = {}
    while (i*i<2*n) {
        toReturn[i*i] = useablePairs(i*i, n)
        i++
    }
    return toReturn
}

/* Test reachable sqs */

// for (var i = 10; i<30; i++) {
//     console.log(i, ':::::', reachableSqs(i))
// }

module.exports = {reachableSqs}