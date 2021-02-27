// 100% on speed
const divide = (dividend, divisor) => {
    if (dividend === 0) { return 0 }
    let shifts = 0, quotient = 0;
    let sign = (dividend < 0 ^ divisor < 0) ? -1 : 1
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    while ((divisor << 1) < dividend && (divisor << 1) > 0) {
        divisor <<= 1; shifts++;
    }
    while (dividend >= divisor) {
        dividend -= divisor;
        quotient += 1 << shifts;
        while (dividend < divisor && shifts > 0) {
            divisor >>= 1; shifts--;
        }
    }
    return sign * quotient;
}

const tests = [
    // [dividend, divisor, trunc(dividend / divisor)]
    [10, 3, 3],
    [354, 354, 1],
    [-43, 8, -5],
    [100, 10, 10],
    [2147483647, 10, 214748364],
    [-2147483648, -3, 715827882]
];

tests.forEach((t, i) => console.log(
    'test', i, divide(t[0], t[1]) === t[2]
))