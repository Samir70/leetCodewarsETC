/**
 * Did iterative versions in c++, python and kotlin
 * G Sorbi haad the idea of using recursion.
 */
const countOdd1 = (arr) => {
    if (arr.length === 1) {
        return arr[0] % 2
    }
    return countOdd(arr.slice(1)) + (arr[0]%2)
}
const countOdd = (arr, index, oddsSoFar) => {
    return index === arr.length ? oddsSoFar : countOdd(arr, index+1, oddsSoFar+arr[index]%2)
}
const minCostToMoveChips = position => {
    let odds = countOdd(position, 0, 0);
    return Math.min(odds, position.length - odds)
};

const tests = [
    { pos: [1, 2, 3], out: 1 },
    { pos: [2, 2, 2, 3, 3], out: 2 }
];
tests.forEach((t, i) => console.log(
    'test', i, minCostToMoveChips(t.pos) === t.out
))