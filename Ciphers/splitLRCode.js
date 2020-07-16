// see regExp version
const encode = (str, k) => {
    var left = [...str].filter((c, i) => i % 2 ? '' : c).join('');
    var right = [...str].filter((c, i) => i % 2 ? c : '').join('');
    return k===1 ? right+left : encode(right+left, k-1)
}

tests = [
    { str: 'This is a string that can be encoded. And then decoded!', k: 5 },
    { str: "shorter", k: 1 },
    { str: "even", k: 10 },
    { str: "odd", k: 12 }
];

tests.forEach(t => {
    var coded = encode(t.str, t.k);
    var original = ''//decode(coded, t.k);
    console.log(t, coded, original);
})