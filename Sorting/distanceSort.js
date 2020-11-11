const kClosest = (arr, k) => {
    var sqDist = arr.map(point => { return { dist: point[0] ** 2 + point[1] ** 2, xy: point } })
    return sqDist.sort((a, b) => a.dist - b.dist).slice(0, k).map(x => x.xy)
}
// but output could be in any order, so sort was wasteful

/**
 * Divide and conquer
 * Say we choose some random element x = A[i] and split the array into two buckets:
 *  one bucket of all the elements less than x, 
 * and another bucket of all the elements greater than or equal to x.
 *  This is known as "quickselecting by a pivot x".
 * 
 * 
 * alt: consider a min heap / prioroty queue
 * but for large k, this will be like sorting the array
 * 
 */
const rndInt = n => Math.floor(Math.random() * n);

const kClosestQuickSelect = (arr, k) => {
    const distSq = p => p[0] ** 2 + p[1] ** 2;
    let len = arr.length;
    if (len === k) { return arr }
    let pivot = rndInt(len);
    var d = distSq(arr[pivot]);
    var lower = [], other = [];
    for (var i = 0; i < arr.length; i++) {
        if (distSq(arr[i]) < d) {
            lower.push(arr[i])
        } else {
            other.push(arr[i])
        }
    }
    if (lower.length === k) {return lower}
    if (lower.length < k ) {
        return lower.concat(kClosestQuickSelect([...other], k - lower.length))
    }
    return kClosestQuickSelect(lower, k)
}

const tests = [
    { points: [[3, 3], [5, -1], [-2, 4]], k: 2, out: [[3, 3], [-2, 4]] },
    { points: [[23, 2], [43, 4], [3, 3], [5, -1], [-2, 4], [5, 5], [7, 7], [6, 5], [9, 7]], k: 2, out: [[3, 3], [-2, 4]] }
];

tests.forEach((t, i) => {
    var out = kClosestQuickSelect(t.points, t.k).join(' and ');
    if (out === t.out.join(' and ')) {
        console.log('\x1b[32m', 'test', i, ':: ', out)
    } else {
        console.log('\x1b[31m', 'test', i, ':: ', out)
    }
});
console.log('\x1b[0m')