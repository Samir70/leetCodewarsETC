var myPow = function(x, n) {
    if (n === 0) {return 1}
    if (n === 1) {return x}
    if (n < 0) {return 1/myPow(x, -n)}
    let root = n % 2 ? myPow(x, (n-1)/2) : myPow(x, n/2);
    return n % 2 ? x * root * root : root * root
};

// handles even very large powers and is a quick way to code exp by repeated squaring.