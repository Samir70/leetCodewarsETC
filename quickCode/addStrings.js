var addStrings = function(num1, num2) {
    let a = num1.length, b = num2.length
    let ans = '', carry = 0;
    while (a > 0 || b > 0 || carry > 0) {
        a--; b--
        let x = a >= 0 ? num1[a] : 0
        let y = b >= 0 ? num2[b] : 0
        let sum = Number(x)+Number(y)+carry
        let digit = sum % 10
        carry = sum > 9 ? 1 : 0
        ans = digit + ans
    }
    return ans
};
