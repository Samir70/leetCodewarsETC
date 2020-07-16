/**
 * Couldn't find a way to use
 * 1, 5, 7, 27, 30, 39, 45, 54, 57, 194, 198, 214, 222, 238, 242, 294, 298, 334, 346, 358,...
 * made by considering permutations of n as numbers base n+1
 */

const factorial = n => n === 1 ? 1 : n*factorial(n-1)

const fromList = (arr, k) => {
    if (k === 1) {
        return arr
    } 
    /**
     * If we have four items to permute, then the permutations arise in blocks of size (n-1)!
     */
    var blockSize = factorial(arr.length - 1);
    var pointer = 0;
    while (k > blockSize) {
        k -= blockSize;
        pointer++
    }
    var firstDigit = arr[pointer];
    var otherDigits = arr.filter(x => x !== firstDigit);
    // console.log('firstDigit', firstDigit, 'rest', otherDigits, 'k reduced to', k);
    return [firstDigit].concat(fromList(otherDigits, k))
}
const getPermutation = (n, k) => {
    var list = [...Array(n).keys()].map(x => x+1);    
    return Number(fromList(list, k).join(''))
}

const tests = [
    {n:4, k:12, out:2431},
    {n:9, k:123, out:123546879},
    {n:9, k:1234, out:124856793},
    {n:9, k:12345, out:146295738},
    {n:9, k:123456, out:416589732},
];

tests.forEach((t, i) => console.log(
    'test', i, '::', getPermutation(t.n, t.k), 'should be', t.out, getPermutation(t.n, t.k) === t.out
))