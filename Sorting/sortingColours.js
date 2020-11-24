// array listing 3 colours (0, 1, 2)
// sort in place so all 0's at start, followed by all 1's and then all 2's

// 2 pass
var sortColors2pass1 = function(nums) {
    var count = [0, 0, 0];
    for (var i = 0; i<nums.length; i++) {
        count[nums[i]]++
    }
    var p = 0;
    for (var c = 0; c<3; c++) {
        while (count[c] >0) {
            count[c]--;
            nums[p] = c;
            p++
        }
    }
};

// tidier 2 pass, 64ms beating 99.77%
var sortColors2pass2 = function(nums) {
    let tally = Array(3).fill(0);
    for (let n of nums) {
        tally[n]++
    }
    let i = 0, counter = 0;
    for (let t of tally) {
        while (t--) {nums[i] = counter; i++}
        counter++
    }
};

// 1 pass
// The idea is to sweep all 0s to the left and all 2s to the right, 
// then all 1s are left in the middle.

var sortColors1pass = nums => {
    var low = 0, high = nums.length-1;
    var i = 0;
    while (i<=high) {
        var col = nums[i]
        switch (col) {
            case 0: {
                nums[i] = nums[low]
                nums[low] = 0;
                low++;
                i++;
                break
            }
            case 1: {
                i++
                break
            }
            case 2: {
                nums[i] = nums[high]
                nums[high] = 2;
                high--
            }
        }
    }
}

// [2, 0, 2, 1, 1, 1]
//  l              h
// [1, 0, 2, 1, 1, 2]
//  l  i        h
// [0, 1, 2, 1, 1, 2]
//     l  i     h


const tests = [
    { in: [2, 0, 2, 1, 1, 0], out: [0, 0, 1, 1, 2, 2] },
    { in: [0, 2, 0, 1, 1, 1, 2, 1, 1, 0], out: [0, 0, 1, 1, 2, 2] },
    { in: [2, 0, 2, 1,0, 0, 2, 1, 0, 0, 1, 1, 1, 0], out: [0, 0, 1, 1, 2, 2] },
    { in: [2,1, 1, 2, 0, 0, 0, 2, 1, 1, 0], out: [0, 0, 1, 1, 2, 2] },
    { in: [2, 0, 2,1, 2, 1, 2, 1, 0, 1, 1, 0], out: [0, 0, 1, 1, 2, 2] }
];

tests.forEach((t, i) => {
    console.log('test', i, t);
    sortColors(t.in)
    console.log('becomes:', t.in)
    sortColors1pass(t.in)
    console.log('becomes:', t.in)
})