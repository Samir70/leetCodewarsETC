/**
 * person i is in a group of size groupSizes[i]
 * solution may not be unique
 */

var groupThePeople = function (groupSizes) {
    var out = [];
    var group = {};
    for (var i = 0; i < groupSizes.length; i++) {
        if (group[groupSizes[i]] === undefined) {
            group[groupSizes[i]] = []
        }
        group[groupSizes[i]].push(i)
    }
    // console.log(group);
    for (var size in group) {
        var s = Number(size);
        while (group[size].length > 0) {
            out.push(group[size].splice(0, s))
        }
    }
    return out
};

// faster:
var groupThePeople2 = function(groupSizes) {
    let obj = {};
    let arr = [];
    
    for (let i = 0; i < groupSizes.length; i++) {
        let n = groupSizes[i];
        if (!obj[n]) {
            obj[n] = [i];
        } else {
            obj[n].push(i)
        };
        
        if (obj[n].length === n) {
            arr.push(obj[n]);
            obj[n] = [];
        }
    } 
    return arr;
};

const tests = [
    [3, 3, 3, 3, 3, 1, 3],
    [2, 3, 3, 2, 3, 1, 1, 2, 4, 2, 4, 3, 3, 4, 4, 3],
    [1],
    [2, 2],
    [2,1,3,3,3,2]
]

const verify = (arr, sizes) => {
    var count = new Set();
    for (var a of arr) {
        var len = a.length
        for (var id of a) {
            count.add(id)
            if (sizes[id] !== len) {
                console.log(id, 'is in', a, 'but should be in a group of size', sizes[id])
                return false
            }
        }
    }
    return count.size === sizes.length ? true : false
}

// console.log(verify([[5], [0, 1, 2], [1,4, 6]], [3, 3, 3, 3, 3, 1, 3]))

tests.forEach((t, i) => {
    console.log('test', t);
    var out = groupThePeople(t);
    console.log(out);
    console.log(verify(out, t))
})