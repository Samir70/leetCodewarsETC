// There is a faster version based on constructing the given number in reverse, thereby using less memory too.
var isPalindrome = function(x) {
    if (x < 0) {return false}
    let digits = [];
    while (x > 0) {
        let digit = x % 10;
        x = (x - digit) / 10;
        digits.push(digit)
    };
    let start = 0, end = digits.length - 1;
    while (start < end) {
        if (digits[start] !== digits[end]) {return false}
        start++; end--;
    }
    return true
};
