// findNumbers(n, d) should return all numbers x where 9 < x <= n where 
// digits increase left to right by at most d

const singleDigits = [..."12345678"].map(Number);

const addDigit = (arr, d) => {
    var newList = [];
    arr.forEach(x => {
        var lastDigit = x % 10;
        for (i = lastDigit+1; i<10 && i<=lastDigit+d; i++) {
            newList.push(x*10 + i)
        }        
    });
    return newList
}

// test above
// const diff = 2;
// var twoDigits = addDigit(singleDigits, diff);
// console.log(twoDigits.join(','))
// var threeDigits = addDigit(twoDigits, diff)
// console.log(threeDigits.join(','))

const findNumbers = (n, d) => {
    var numbers = [..."12345678"].map(Number);
    var digits = 0;
    while (numbers[numbers.length - 1] < n) {
        numbers = numbers.concat(addDigit(numbers.filter(x=>x>=10**digits), d));
        digits++;
    }
    return numbers.filter(x => 9<x && x<=n)
}

const tests = [
    [3, 1],
    [13, 1],
    [20, 2],
    [30, 2],
    [44, 2],
    [50, 3],
    [47, 3],
    [150, 6]
];

tests.forEach(t => {
    console.log('finding numbers for '+t.join(','), findNumbers(t[0], t[1]))
});

// finding numbers for 3,1 []
// finding numbers for 13,1 [ 12 ]
// finding numbers for 20,2 [ 12, 13 ]
// finding numbers for 30,2 [ 12, 13, 23, 24 ]
// finding numbers for 44,2 [ 12, 13, 23, 24, 34, 35 ]
// finding numbers for 50,3 [ 12, 13, 14, 23, 24, 25, 34, 35, 36, 45, 46, 47 ]
// finding numbers for 47,3 [ 12, 13, 14, 23, 24, 25, 34, 35, 36, 45, 46, 47 ]