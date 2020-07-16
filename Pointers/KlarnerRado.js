const klarnerRado = (n) => {
    var members = [1];
    var fromDoublePointer = 0, fromTriplePointer = 0;
    var fromDouble = 3, fromTriple = 4;
    var lastAdded = 1;
    while (members.length < n) {
        if (fromDouble < fromTriple) {
            if (fromDouble !== lastAdded) {
                members.push(fromDouble);
                lastAdded = fromDouble
            }
            fromDoublePointer++;
            fromDouble = members[fromDoublePointer] * 2 + 1
        } else {
            if (fromTriple !== lastAdded) {
                members.push(fromTriple);
                lastAdded = fromTriple;
            }
            fromTriplePointer++;
            fromTriple = members[fromTriplePointer] * 3 + 1
        }
        // console.log(fromDouble, fromTriple, lastAdded)
    }
    return members
}

const klarnerRadoSequence = [
    1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, 28, 31, 39, 40, 43, 45,
    46, 55, 57, 58, 63, 64, 67, 79, 81, 82, 85, 87, 91, 93, 94, 111,
    115, 117, 118, 121, 127, 129, 130, 135, 136, 139, 159, 163,
    165, 166, 171, 172, 175, 183, 187, 189, 190, 193, 202, 223,
    231, 235, 237
]

var correct = 0;
for (var i = 1; i < 62; i++) {
    if (klarnerRado(i).join(',') !== klarnerRadoSequence.slice(0, i).join(',')) {
        console.log('error at ', i)
    } else {
        correct++
    }
}
console.log('got ', correct, 'right!')