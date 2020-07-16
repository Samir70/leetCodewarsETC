class Node {
    constructor(value) {
        this.value = value;
        this.next = null
    }
}

class NumberList {
    constructor() {
        this.head = null;
        this.size = 0
    }

    add(digit) {
        var node = new Node(digit);
        if (this.head === null) {
            this.head = node
        } else {
            var current = this.head;
            while (current.next) { current = current.next }
            current.next = node
        }
        this.size++
    }
}

const listify = (n) => {
    var numList = new NumberList;
    [...n + ''].reverse().forEach(d => numList.add(Number(d)))
    return numList
}

const delistify = (num) => {
    var digit = num.head;
    var value = 0;
    var powerTen = 1;
    while (digit) {
        value += digit.value * powerTen;
        powerTen *= 10
        digit = digit.next;
    }
    return value
}

const add = (leftList, rightList) => {
    // console.log(JSON.stringify(leftList), JSON.stringify(rightList))
    var lpoint = leftList.head;
    var rpoint = rightList.head;
    var sumList = new NumberList;
    var carry = 0;
    while (lpoint || rpoint) {
        left = lpoint === null ? 0 : lpoint.value;
        right = rpoint === null ? 0 : rpoint.value;
        // console.log('adding digits', left, right);
        var sum = (left + right) + carry;
        var unit = sum % 10;
        carry = (sum - unit)/10;
        sumList.add(unit);
        lpoint = lpoint === null ? null : lpoint.next;
        rpoint = rpoint === null ? null : rpoint.next;
        // console.log('running total: ', finalSum, 'carrying:', carry)
    }
    if (carry > 0) {sumList.add(carry)}
    return sumList
}

// *********************TESTS*********************
// **************DELISTIFY RETRIEVES NUMBER*******
// var correct = 0;
// for (var i=0; i<1000; i++) {
//     var a = Math.floor(Math.random() * 1000000000);
//     var aListed = listify(a);
//     if (a !== delistify(aListed)) {
//         console.log(a, delistify(aListed))
//     } else {
//         correct++
//     }
// }
// console.log(correct, 'numbers correctly converted to list and back');

// ************TESTS***************
// ************ADD LISTIFIED NUMBERS**********
var correct = 0;
for (var i = 0; i < 10000; i++) {
    var a = Math.floor(Math.random() * 1000000000);
    var b = Math.floor(Math.random() * 100000000000000);
    var viaList = delistify(add(listify(a), listify(b)))
    if (a + b !== viaList) {
        console.log(a, b, 'sum:', a + b, 'VIA LISTIFYING:', viaList);
    } else {
        correct++
    }
}
console.log(correct, 'additions correct')

// console.log(6574, 938, '=', 6574+938, 'VIA LISTIFYING:', add(listify(6574), listify(938)));
// console.log(JSON.stringify(listify(38945)))