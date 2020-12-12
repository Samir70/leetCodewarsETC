// 148ms, 6%
// didn't acount for leading zeroes but passed
const makeFib = (a, b, str) => {
    let last2 = [a, b];
    let fib = [a, b];
    while (str.indexOf(last2.join('')) !== -1 && fib.join('').length < str.length) {
        last2 = [last2[1], last2[0]+last2[1]];
        if (last2[1] >= 2**31) {return false}
        fib.push(last2[1])
    }
    // console.log('made fib',a, b, fib)
    if (fib.join('') === str) {
        return fib
    }
    return false
} 

var splitIntoFibonacci = function(str) {
    let n = 1, m=  1;
    const digits = (a, b) => a + b + Math.max(a, b);
    let x, y;
    while (digits(n, m) <= str.length) {
        x = Number(str.slice(0, n));
        y = Number(str.slice(n, m+n))
        while (digits(n, m) <= str.length) {
            x = Number(str.slice(0, n));
            y = Number(str.slice(n, m+n));
            if (makeFib(x, y, str)) {return makeFib(x, y, str)}
            m++
        }
        n++; m = 1
    }   
    return []
};

const tests = [
    "123456579",
    "1123581321",
    "539834657215398346785398346991079669377161950407626991734534318677529701785098211336528511",
    "1320581321313221264343965566089105744171833277577",
];

tests.forEach(t => console.log(
    splitIntoFibonacci(t)
))