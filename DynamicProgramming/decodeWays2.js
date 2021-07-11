const base = 10**9 + 7;
var numDecodings = function(s) {
    let prev = [1,0,0] // how many of other / single 1 or 2
    for (let d of s) {
        let n = Number(d)
        let cur = [0,0,0]
        let asSingle = d === 0 ? 0 : prev.reduce((a, v) => (a+v)%base);
        let after1 = prev[1]
        let after2 = d === '*' || n <= 6 ? prev[2] : 0
        if (d === '*') {
            let singlesOver3 = (asSingle * 7) % base;
            after1 = (after1*9) % base;
            after2 = (after2*6) % base;
            cur = [singlesOver3 + after1 + after2, asSingle, asSingle]
        } else {
            switch (n) {
                case 0: {cur = [after1+after2, 0, 0]; break}
                case 1: {cur = [after1+after2, asSingle, 0]; break}
                case 2: {cur = [after1+after2, 0, asSingle]; break}
                default: {cur = [asSingle+after1+after2, 0, 0]}
            }
        }
        prev = cur.map(d => d%base)
        // console.log(prev)
    }
    return prev.reduce((a, v) => (a+v) % base)
};

const tests = [
    { s: "4516*725", out: 40 },
    { s: "11102125", out: 10 },
    { s: "*", out: 9 },
    { s: "1*", out: 18 },
    { s: "2*", out: 15 },
    { s: "4323458768761118726398712346982712221112121212121212*24352346567122761276287692811262817261872", out: 642879944 },
    { s: "1**", out: 177 },
    { s: "7*9*3*6*3*0*5*4*9*7*3*7*1*8*3*2*0*0*6*", out: 196465252 }
]