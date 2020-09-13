const encode = (str, k) => {
    const leftRE = /(.)(.||$)/g;
    var left = ''
    var nextLetter = leftRE.exec(str);
    while (nextLetter !== null) {
        left += nextLetter[1];
        nextLetter = leftRE.exec(str);
    }
    const rightRE = /.(.)/g
    var right = '';
    nextLetter = rightRE.exec(str);
    while (nextLetter !== null) {
        right += nextLetter[1];
        nextLetter = rightRE.exec(str);
    }
    console.log(right + left)
    return k === 1 ? right + left : encode(right + left, k - 1)
};

// encode('Hello', 2);

const encode2 = (str, k) => {
    const pairs = str.match(/.(.||$)/g)
    const left = pairs.map(x => x[0]).join('');
    const right = pairs.map(x => x[1] || '').join('');
    // console.log(right + left);
    return k === 1 ? right + left : encode2(right + left, k - 1)
}
// encode2('Hello', 4);

const decode = (str, k) => {
    var mid = str.length/2;
    var left = str.slice(0, mid), right = str.slice(mid);
    // console.log(left, right);
    var outstr = ''
    for (var i = 0; i<right.length; i++) {
        outstr += right[i]+(left[i] || '')
    }
    return k === 1 ? outstr : decode(outstr,k-1)
}

// decode('elHlo', 1)

tests = [
    {str:'This is a string that can be encoded. And then decoded!', k:5},
    {str:"shorter", k:2},
    {str:"even", k:10},
    {str:"odd", k:12}
];

tests.forEach(t => {
    var coded = encode2(t.str, t.k);
    var original = decode(coded, t.k);
    console.log(t, coded, original);
})




// from codewars/codesignal/??
// function encrypt(text, n) {
//     for (let i = 0; i < n; i++) {
//         text = text && text.replace(/.(.|$)/g, '$1') + text.replace(/(.)./g, '$1')
//     }
//     return text
// }

// function decrypt(text, n) {
//     let mid = text && text.length / 2 || 0
//     for (let i = 0; i < n; i++) {
//         text = text.slice(mid).replace(/./g, (c, i) => c + (i < mid ? text[i] : ''))
//     }
//     return text
// }
