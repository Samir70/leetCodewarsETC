// in place, collect odd/even
const sorted = (arr) => {
    if (arr.length<2) {return arr}
    var startPointer = 0, endPointer = arr.length -1;
    while (startPointer<endPointer) {
        while (arr[startPointer]%2 === 0) {startPointer++}
        while (arr[endPointer] % 2 === 1) {endPointer--}
        if (startPointer<endPointer) {
            var temp = arr[startPointer];
            arr[startPointer] = arr[endPointer];
            arr[endPointer] = temp;
        }
    }
    return arr
}

const verify = (arr) => {
    var parity = arr.map(x => x%2 ? 'O' : 'E').join('');
    parity = parity.replace(/O+/, 'O');
    parity = parity.replace(/E+/, 'E');
    return parity
}

const rndIntArray = (n) => [...Array(n)].map(x=>Math.floor(Math.random()*100));

var tests = [[1],  [1, 2, 3, 4, 5, 6, 7], [1, 1, 1, 1, 1], [2, 2, 2], [1, 1, 2, 2, 1, 1, 2, 2]];
for (var i=0; i<10; i++) {tests.push(rndIntArray(2000))};

tests.forEach(t => console.log("sorted:", verify(sorted(t))))