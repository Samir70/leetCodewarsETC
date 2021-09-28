const sqdigitSum = n => [...'' + n].map(x => x * x).reduce((acc, val) => acc + val, 0)

function* happyNum(n) {
    var visited = [];
    var carryOn = true;
    var current = n;
    while (carryOn) {
        yield current
        if (visited.includes(current)) {
            carryOn = false
            return visited.slice(visited.indexOf(current)) //'SAD
        }
        if (current === 1) {
            carryOn = false;
            return n + ' is a Happy Number'// 'HAPPY'
        }
        visited.push(current)
        current = sqdigitSum(current)
    }
}

// var isHappy = happyNum(86);
// var getnext = true
// while (getnext) {
//     var n = isHappy.next()
//     console.log(n)
//     getnext = !n.done
// }

var n = 1000
var numbers = Array(n)
numbers[1] = 'HAPPY'
for (var i = 2; i < n; i++) {
    var nums = [];
    var isHappy = happyNum(i);
    var getnext = true;
    while (getnext) {
        var v = isHappy.next()
        nums.push(v.value);
        getnext = !v.done;
        if (numbers[v.value] !== undefined) {
            getnext = false;
            v.value = numbers[v.value]
        }
    }
    nums.forEach(x => numbers[x] = v.value)
}

console.log(numbers.reduce((acc, v, i) => v === 'HAPPY' ? [...acc, i] : acc, []).join(','))

const happys = [
    1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100,
    103, 109, 129, 130, 133, 139, 167, 176, 188, 190, 192, 193, 203, 208, 219,
    226, 230, 236, 239, 262, 263, 280, 291, 293, 301, 302, 310, 313, 319, 320,
    326, 329, 331, 338, 356, 362, 365, 367, 368, 376, 379, 383, 386, 391, 392,
    397, 404, 409, 440, 446, 464, 469, 478, 487, 490, 496, 536, 556, 563, 565,
    566, 608, 617, 622, 623, 632, 635, 637, 638, 644, 649, 653, 655, 656, 665,
    671, 673, 680, 683, 694, 700, 709, 716, 736, 739, 748, 761, 763, 784, 790,
    793, 802, 806, 818, 820, 833, 836, 847, 860, 863, 874, 881, 888, 899, 901,
    904, 907, 910, 912, 913, 921, 923, 931, 932, 937, 940, 946, 964, 970, 973, 989, 998
]

/*
NB: only cycle is: 4, 16, 37, 58, 89, 145, 42, 20  (or 1, 1, 1, 1,...)
So every number reduces to 1 or passes 4 over and over
var isHappy = function(n) {
    let state = n;
    while (state > 1) {
        state = [...""+state].map(Number).reduce((acc, val) => acc + val*val, 0)
        // console.log({state, seen})
        if (state === 4) {return false}
    }
    return true
};
*/
