// group of d consecutive digits in the number n
// return the largest such sum
// eg: sumDigits(012345, 4) finds 6, 10, 14 and returns 14

const sumDigits = (n, d) => {
    var max = 0;
    var partialSums = {};
    var digits = [...''+n];
    for (var i = 0; i+d <= digits.length; i++) {
        var s = digits.slice(i, i+d).map(Number).reduce((a, b) => a+b, 0);
        if (s>max) {max = s}
        partialSums[digits.slice(i, i+d).join('')] = s
    }
    return max
    // return partialSums
}

// to test sumDigits 
// var test1 = [3857546, 3455611, 23457658, 3245342, 7868578, 3453425]

// test1.forEach(x => console.log(sumDigits(x, 4)));
// { '3857': 23, '5754': 21, '7546': 22, '8575': 25 }
// { '3455': 17, '4556': 20, '5561': 17, '5611': 13 }
// { '2345': 14, '3457': 19, '4576': 22, '5765': 23, '7658': 26 }
// { '2453': 14, '3245': 14, '4534': 16, '5342': 14 }
// { '6857': 26, '7868': 29, '8578': 28, '8685': 27 }
// { '3425': 14, '3453': 15, '4534': 16, '5342': 14 }
// with max being
// 25 , 20, 26, 16, 29, 16

// max_sumDig(nMax, maxSum) finds all the numbers x in the range [1000, nMax] 
// such that sumDigits(x, 4) <= maxSum
// output [howManyNumbers, closestToMean, sumOfAllTheNumbers]


const max_sumDig = (nMax, maxSum) => {
    var numbers = [];
    for (var i = 1000; i<=nMax; i++) {
        if (sumDigits(i, 4) <= maxSum) {numbers.push(i)}
    }
    var howMany = numbers.length;
    var sumOfAll = numbers.reduce((a, b) => a+b, 0);
    var mean = howMany === 0 ? 0 : sumOfAll/howMany;
    var closestToMean = numbers.reduce((a, b) => Math.abs(b-mean) < Math.abs(a-mean) ? b : a)
    return [numbers.length, closestToMean, sumOfAll];
}

var test2 = [
    [2000, 3], // 1000, 1001, 1002, 1010, 1011, 1020, 1100, 1101, 1110, 1200, 2000
    // 11, 1141.3636363636363, 12555
    [2000, 4], //  21, 1126.904761904762, 23665
    [2000, 7], //  [85, 1200, 99986]
    [3000, 7]  //  [141, 1600, 220756] 
]

test2.forEach(x=>console.log(max_sumDig(x[0], x[1]).join(', ')));
11, 1141.3636363636363, 12555
21, 1126.904761904762, 23665