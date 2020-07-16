// aim to compare a new function f with a function compare
// how many tests to run
// function for making inputs
// function for judging equality
const test = (f, compare, testCount, testInput, judge) => {
    console.log('Function needs ' + f.length + ' arguments.');
    for (var i = 0; i < testCount; i++) {
        const a = random ? Math.floor(Math.random() * maxInput) : i;
        const b = random ? Math.floor(Math.random() * maxInput) : i + 1;
        switch (f.length) {
            case 2: {
                console.log(a, '= ' + compare(a));
                console.log(b, '= ' + compare(b));
                console.log('function: ' + f(a, b));
                break;
            }
            default: {
                console.log(a, '= ' + compare(a), 'function: ' + f(a));
                console.log('Same? ', compare(a)+'' === f(a)+'')
            }
        }
    }
}