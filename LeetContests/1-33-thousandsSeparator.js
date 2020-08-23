/**
 * Given a positive integer, output a string with a dot after every 3 digits,
 * counting from right
 */

// var thousandSeparator = function(n) {
//     if (n<1000) {return n+''}
//     let extra = ''+(n%1000);
//     while (extra.length < 3) {extra = '0'+extra}
//     return thousandSeparator(Math.floor(n/1000))+'.'+extra
// };

const thousandSeparator = num => {
    let out = '', n = num;
    while (n > 1000) {
        let leastSig = '' + (n % 1000);
        while (leastSig.length < 3) { leastSig = '0' + leastSig }
        out = '.' + leastSig + out
        n = Math.floor(n / 1000)
    }
    return n + out
}

const tests = [
    2, 34, 987, 1234, 435687,
    504050, // this caught me out first time.
    345638947, 6983476044,
];

tests.forEach((t, i) => console.log(
    'test', i, thousandSeparator(t)
))