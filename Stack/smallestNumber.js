
// const removeKDigits = (num, k) => {
//     if (num==='') {return "0"}
//     if (num.length === k) {return "0"}
//     if (k === 0) {return num}
//     var a = num[0], b = num[1], rest = num.slice(2).replace(/^0+/, '');
//     if (b==="0") {return removeKDigits(rest, k-1)}
//     return a<b ? removeKDigits(a+rest, k-1) : removeKDigits(b+rest, k-1)
// }
// *************************?
// const removeKDigits = (num, k) => {
//     if (num.length === k) {return "0"}
//     if (k === 0) {return num}
//     console.log("numlength", num.length, num.slice(0, 20))
//     var removeNth = (arr, n) => {
//         arr[n] = "delete";
//         return arr.filter(x => x!=="delete")
//     }
//     var allPoss = Array(num.length).fill(0)
//         .map((x, i) => removeNth([...num], i).join(''))
//         .map(Number);
//     // console.log(allPoss);
//     const smallest = Math.min(...allPoss); // is infinity for very large numbers
//     console.log('smallest', smallest, 'allPoss.length', allPoss.length, allPoss[0]<)
//     return smallest //removeKDigits(''+smallest, k-1)
// }

// via willey
// This is the key algorithm, so study it carefully. 
// If you want more practice, check out Merge Intervals and Sliding Window Maximum, 
// which use the same technique. Notice that out is ALWAYS increasing (i.e. sorted), 
// since there are no pairs that are decreasing. 
// This is called a monotonic stack/queue, and is a very important concept.


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
