// Binary tree represented as an array
// root at index 0
// children at 1, 2
// theirs at 3, 4, 5, 6
// row n starts at 2^n - 1   (root at row 0)

// cousins have different parent, but are on same row

const areCousins = (r, x, y) => {
    console.log(r.length)
    const indX = r.indexOf(x), indY = r.indexOf(y);
    const indexOfParent = (i) => i % 2 === 0 ? (i - 2) / 2 : (i - 1) / 2;
    const parentOfX = indexOfParent(indX), parentOfY = indexOfParent(indY);
    console.log(indX, indY, parentOfX, parentOfY)
    if (parentOfX === parentOfY) { return false }
    const rowStarts = (n) => [0, 1, 3, 7, 15, 31, 63, 127].find(x => x > n);
    console.log('rowStarts', rowStarts(indX), rowStarts(indY))
    return rowStarts(indX) === rowStarts(indY)
}

/**
 * Then they gave us a defintion of tree
 */


//  Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const makeTree = (arr) => {
    const r = new TreeNode(arr[0], null, null);
    // L, R, 
    // LL, LR, RL, RR, 
    // LLL, LLR, LRL, LRR, ...
    for (var i = 1; i < arr.length; i++) {
        var level = [1, 3, 7, 15, 31, 63, 127].filter(x => x <= i).length;
        var startOfRow = [0, 1, 3, 7, 15, 31, 63, 127].reverse().find(x => x <= i)
        var binary = (i - startOfRow).toString(2);
        while (binary.length < level) { binary = '0' + binary }
        // console.log(i, binary, startOfRow, level);
        var current = r
        for (var d of binary.slice(0, -1)) {
            current = d === '0' ? current.left : current.right;
            // console.log('I travelled ' + d, JSON.stringify(current))
            //    if (current === null) {break} 
        }
        if (binary[binary.length - 1] === '0') {
            current.left = new TreeNode(arr[i], null, null);
        } else {
            current.right = new TreeNode(arr[i], null, null);
        }
        // console.log('while r is: ', JSON.stringify(r))
    }
    // console.log(JSON.stringify(r));
    return r
}

makeTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

const treeToArr = (t) => {
    var arr = [t.val]
    var i = 1;
    var notDone = true;
    while (notDone) {
        var level = [1, 3, 7, 15, 31, 63, 127].filter(x => x <= i).length;
        var startOfRow = [0, 1, 3, 7, 15, 31, 63, 127].reverse().find(x => x <= i)
        var binary = (i - startOfRow).toString(2);
        while (binary.length < level) { binary = '0' + binary }
        // console.log(i, binary, startOfRow, level);
        var current = t
        for (var d of binary) {
            current = d === '0' ? current.left : current.right;
            console.log('I travelled ' + d, JSON.stringify(current))
        }
        if (current === null) {
            arr[i] = null
        } else {
            arr[i] = current.val;
        }
        i++
    }
    return arr
}

// console.log('the array is', treeToArr(makeTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])))

const tests = [
    [[1, 2, 3, 4], 4, 3, false],
    [[1, 2, 3, null, 4, null, 5], 5, 4, true],
    [[1, 2, 3, null, 4], 2, 3, false], //same parent
    [[0, 1, 2, 3, 4, 5], 4, 5, true]
];

tests.forEach(t => console.log(t, areCousins(...t)))


// failed for
const failure = [1,
     18, 2, 
     null, null, 3, 4, 
     17, 10, 5, 6, null, null, 21, 12,
     8, 11, 31, 7, null, null, 37, 15, null, 9, 29, 14, null, 35, 24, 20, 
     44, null, 19, 25, 22, 13, 41, 32, 39, 16, 36, null, null, null, 27, null, null, null, 23, null,
      null, 47, 30, 26, null, 49, null, 50, null, null, null, null, 
    45, 28,
    null, null, null, null, 43, null, null, null, 34, 38, null, 33, null, null, null, null, null, 46, 40,
    null, null, null, null, 48, null, 42] // checking 28 and 30
console.log(areCousins(failure, 28, 30));
// but 28 and 30 are on different levels. The index of 28 is 64, index of 30 is 53
// misunderstood implementation. There are no children of nulls, 
// so not every position of tree is indexed in the array

// My solution
const findHeight = (val, root, height) => {
    const notFound = {parent:-1, height:-1}
    if (root === null) { return  notFound}
    if (root.left) {
        if (root.left.val === val) {return {parent:root.val, height}}
    } 
    if (root.right) {
        if (root.right.val === val) {return {parent:root.val, height}}
    }    
    var left = findHeight(val, root.left, height+1);
    var right = findHeight(val, root.right, height+1);
    return left.height > right.height ? left : right
}

var isCousins = function(root, x, y) {
    if (root.val === x) {return false}
    if (root.val === y) {return false}
    var xH = findHeight(x, root, 0), yH = findHeight(y, root, 0);
    if (xH.parent === yH.parent) {return false}
    console.log(xH, yH);
    return xH.height === yH.height
};