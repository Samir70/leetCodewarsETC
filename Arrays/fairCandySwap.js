var fairCandySwap = function(A, B) {
    let sumA = A.reduce((a, b) => a+b, 0);
    let sumB = B.reduce((a, b) => a+b, 0);
    let diff = Math.abs(sumA-sumB)
    if (diff % 2 === 1) {return null}
    diff /= 2;
    console.log(diff)
    let setB = new Set(B);
    for (let a of A) {
        if (setB.has(a - diff)){
            return [a, a - diff]
        }
    }
    let setA = new Set(A);
    for (let b of B) {
        if (setA.has(b - diff)){
            return [b - diff, b]
        }
    }
    return [0,0]
};

passes:
[1,1]
[2,2]

and
[1,2,5]
[2,4]

fails
[2]
[1,3]
