// 76ms beats 82%
var consecutiveNumbersSum = function(target) {
    /*
    sum two consec: 1+2, 2+3, 3+4, ... = [3, 5, 7, 9, ...] goes up in twos
    sum 3 consec: [6, 9, 12, 15, ...] goes up in 3s
    sum n consec: [tri(n), ...] goes up n each time so each number in this is congruent to tri(n) mod n
    so only possible when target % n === tri(n) % n
    */
    if (target === 1) {return 1}
    let tri = 1, n = 2, out = 1
    while (tri < target) {
        tri += n;
        if (target % n === tri % n) {
            // console.log(target, 'can be written as sum of', n, 'consecutive numbers'); 
            out++
        }
        n++
    }
    return out
};

// Another method via lee215
/*
N = (x+1) + (x+2) + ... + (x+k)
N = kx + k(k+1)/2
N * 2 = k(2x + k + 1),where x >= 0, k >= 1

Either k or 2x + k + 1 is odd.
*/
