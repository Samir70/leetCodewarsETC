const decToBase3 = (n) => [...n.toString(3)].map(Number);

// const padArray = (arr, len) => {
//     var padding = []
//     while (arr.length + padding.length < len) {padding.push(0)}
//     return padding.concat(...arr);
// }

// might be faster to get second number this way:
const add1Mod3 = (arr) => {
    var count = arr.length - 1;
    var carry = true;
    while (carry && count >=0) {
        carry = arr[count] === 2 ? true : false;
        arr[count] = (arr[count] + 1) % 3;
        count--;
    }
    return arr
}

const binomial = (m, n) => {
    if (m<n) {return 0} // handles 01, 02, 12
    if (m===n) {return 1} // handles 00, 11, 22
    if (m===1 && n===0) {return 1}
    // m must be 2
    return  n===0 ? 1 : n===1 ? 2 : 1
}

const LucasCoeffs = (m3, n3) => { //m3 is in base 3, array of digits
    var count = m3.length;
    var partials = [];
    for (var i = 0; i<count; i++) {
        partials.push(binomial(m3[i], n3[i]));
    }
    // console.log('m:', m3, 'n:', n3);
    // console.log('partials:', partials)
    return partials.reduce((acc, v) => acc*v, 1);
}

const whichToAdd = (rowLength) => {
    var indexList = []; 
    var m = decToBase3(rowLength-1);
    var n = m.map(x=>0);
    for (var i = 0; i<rowLength; i++) {
        var c = LucasCoeffs(m, n);
        // console.log(i, n);
        n = add1Mod3(n);
        // if (c>0) {console.log(rowLength-1, 'choose', i, 'is:', c)};
        while (c>0) {
            indexList.push(i); 
            c--;
        }
    }
    return indexList;
}

// console.log(whichToAdd(55));

module.exports = {whichToAdd}