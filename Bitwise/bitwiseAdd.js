const bitwiseSum = function (a, b) {
    // a, b positive
    let carry;
    while ((a & b) !== 0) {
        carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a ^ b;
};

const bitwiseSum2 = function(a, b) {
    // a, b positive
    return b ? bitwiseSum2(a ^ b, (a & b) << 1) : a;
};

/**

 011 (3) XOR 111 (7) = 100 (4)
 011 (3) AND 111 (7) = 011 (3) since it is the carry, we shift <<1, so it becomes 110 or 6.

 100 XOR 110 = 010
 100 AND 110 = 100 becomes 1000 or 8

 010 AND 1000 = 1010 or 10, with no carry so stop
*/

const test = (f, testCount) => {
    var correct =0
    for (var i = 0; i < testCount; i++) {
        const a = Math.floor(Math.random()*10000);
        const b = -Math.floor(Math.random()*10000);
        if (a+b !== f(a, b)) {
            console.log('sum of ', a, b, 'is', a+b, 'not', f(a, b))
        } else {
            correct++
        }
    }
    console.log('got ', correct, 'out of ', testCount)
    return correct
}

test(bitwiseSum2, 10)