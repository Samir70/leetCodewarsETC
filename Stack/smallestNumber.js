const removeKDigits = (num, k) => {
    if (num.length === k ) {return "0"}
    var answer = [];
    for (var i=0; i<num.length; i++) {
        while (k>0 && answer.length > 0 && answer[answer.length - 1] > num[i]) {
            answer.pop();
            k--
        }
        answer.push(num[i]);
    }
    while (k>0) {
        answer.pop();
        k--
    }
    while (answer[0] === '0') {answer.shift()}
    return answer.length === 0 ? "0" : answer.join('')
}

const tests = [
    {num: "1432219", k: 3, output: "1219"},
    {num: "4212219", k: 3, output: "1219"},
    {num: "2412219", k: 3, output: "1219"},
    {num: "10200",   k: 1, output: "200"},
    {num: "10200",   k: 2, output: "0"},
    {num: "10201",   k: 2, output: "1"},
    {num: "10201",   k: 3, output: "0"},
    {num: "10",      k: 2, output: "0"},
    {num: "5434",    k: 0, output: "5434"},
    {num: "112",     k: 1, output: "11"}
    // numbers with too many digits return infinity as smallest
];

tests.forEach(t => {
    var result = removeKDigits(t.num, t.k);
    if (result === t.output) {
        console.log('\x1b[32m', 'input:', t.num, "remove", t.k, 'correctly gives ', result )
    } else {
        console.error('\x1b[31m', 'Input', t.num, "remove", t.k, "gives", result, "Should be:", t.output)
    }
});
console.log('\x1b[0m')
