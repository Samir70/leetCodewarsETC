// count the number of strings of length n, where characters are in alphabetical order
var countVowelStrings = function(n) {
    let options = [1, 1, 1, 1, 1];
    let len = 1;
    while (len < n) {
        len++
        let newOpt = [];
        let sum = 0;
        for (let i = 0; i<5; i++) {
            sum += options[i];
            newOpt.push(sum)
        }
        options = newOpt
    }
    return options.reduce((a, b) => a+b)
};

const closed = n => (n+1)*(n+2)*(n+3)*(n+4)/24

let res = [];
let start = 1000000, len = 100
for (let i = start; i < start+len; i++) {
    console.log([countVowelStrings(i), closed(i)])
}
console.log(res)
/**
 * [5,15,35,70,126,210,330,495,715,1001,1365,1820,2380,3060,
 * 3876,4845,5985,7315,8855,10626,12650,14950,17550,20475,23751,
 * 27405,31465,35960,40920,46376,52360,58905,66045,73815,82251,91390,
 * 101270,111930,123410,135751,148995,163185,178365,194580,211876,230300,
 * 249900,270725,292825,316251]
 */