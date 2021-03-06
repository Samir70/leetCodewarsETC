const { bigtest, bigOut } = require('./4-bigtest')
/**
 * count number of arrays of 
 * -- length n 
 * -- elements are positive integers
 * -- product of elements is k 
 */

// queries is an array of [n, k] as above
// give answer mod 10^9 + 7

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const factorise = n => {
    let factors = []
    for (let p of primes) {
        let e = 0;
        while (n % p === 0) { n /= p; e++ }
        if (e > 0) { factors.push([p, e]) }
    }
    if (n > 1) { factors.push([n, 1]) }
    return factors
}

const base = 10 ** 9 + 7;
let memo = new Map()
const choose = (n, m) => {
    if (m === 0 || m === n) { return 1 }
    if (m === 1 || m === n - 1) { return n }
    let key = [n, m].join(',')
    if (memo.has(key)) { return memo.get(key) }
    // console.log('working out', n, 'choose', m)
    memo.set(key, (choose(n - 1, m - 1) + choose(n - 1, m)) % base)
    return memo.get(key)
}

const multMod = (a, b) => {
    let out = 0;
    while (b > 0) {
        if (b%2) {out += a; out %= base}
        a *= 2; a %= base;
        b = b >> 1; 
    }
    return out
}

const waysToFill = (n, k) => {
    factors = factorise(k)
    // console.log(factors);
    let ways = 1
    for (let f of factors) {
        // console.log(n, f, choose(n + f[1] - 1, f[1]))
        ways = multMod(ways, choose(n + f[1] - 1, f[1]));
    }
    return ways
}

var waysToFillArray = function (queries) {
    let out = []
    for (let [n, k] of queries) {
        out.push(waysToFill(n, k))
    }
    return out
};


var waysToFillArrayMyTest = function (queries, expected) {
    let out = []
    for (let i in expected) {
        let [n, k] = queries[i];
        ans = waysToFill(n, k)
        out.push(ans)
        if (ans !== expected[i]) {
            console.log(n, k, 'should be', expected[i], 'not', ans)
        } else (console.log(n, k, 'correct', ans))
    }
    return out
};

const tests = [
    { qs: [[2, 6], [5, 1], [73, 660]], out: [4, 1, 50734910] },
    { qs: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]], out: [1, 2, 3, 10, 5] },
    { qs: [[373, 196], [101, 229], [466, 109], [308, 83], [296, 432]], out: [865201973, 101, 466, 308, 411805778] },
    {
        qs: [[500, 227], [4, 180], [255, 43], [218, 32], [80, 196], [224, 100], [105, 93], [130, 137], [488, 112], [205, 151], [466, 462], [201, 486], [171, 134], [373, 15], [124, 137], [266, 439], [27, 91], [213, 339], [369, 48], [62, 181], [404, 87], [242, 316], [110, 190], [339, 397]],
        out: [500,400,255,294249646,10497600,635040000,11025,130,386940391,205,156728007,354162952,29241,139129,124,266,729,45369,707715262,62,163216,7115526,1331000,339]
    },
    {
        qs: [[326,476],[160,348],[476,238],[33,194],[306,54],[138,500],[486,320],[92,28],[372,216],[5,214],[125,334],[190,96],[327,500],[403,435],[232,119],[70,226],[171,118],[63,192],[437,417],[221,447],[236,422],[368,414],[326,329],[257,330],[207,308],[305,13],[21,430],[371,79],[143,39],[154,186],[33,362],[494,55],[225,72],[18,323],[369,244],[308,408],[352,419],[155,67],[34,113],[151,384],[473,289],[272,376],[391,360],[443,344],[23,460],[350,446],[441,331],[116,70],[143,270],[470,259],[483,224],[274,215],[445,183],[456,7],[403,256],[42,451],[316,492],[182,319],[378,471],[54,475],[4,315],[356,136],[336,97],[332,461],[54,324],[337,112],[458,126],[441,218],[278,391],[377,179],[198,456],[62,481],[262,404],[208,234],[352,52],[402,213],[254,385],[311,111],[437,190],[156,173],[296,401],[5,162],[100,290],[354,140],[160,484],[376,104],[443,429],[103,201],[346,374],[371,483],[270,51]],
        out: [664617041,329728000,107850176,1089,475640929,292739752,697468656,393576,345443727,25,15625,66131829,397205907,65450827,53824,4900,29241,895560630,190969,48841,55696,194747841,106276,362470373,922453272,305,9261,371,20449,3652264,1089,244036,913250289,324,25189785,467154818,352,155,34,486908600,112101,922358528,849095848,462479528,146004,122500,441,1560896,176240290,220900,342478801,75076,198025,456,43904609,1764,1387581,33124,142884,80190,160,699603522,336,332,586589850,350310117,48503650,194481,77284,377,490533243,3844,9026686,940386304,21869056,161604,16387064,96721,83453453,156,296,350,1000000,874230811,165894400,357821355,86938307,10609,41421736,51064811,72900]
    },
    {
        qs: [
            [403, 256], [7753, 7128], [7089, 288], [8510, 3888],
            [7953, 5832], [9970, 1584], [7623, 4536], [5569, 7688], [8789, 7220],
            [8694, 1500]
        ],
        out: [
            43904609, 924857967, 258027169, 237228488, 670511439,
            59132895, 517135137, 394596190, 194425723, 914592765
        ]
    }
]

tests.forEach((t, i) => console.log(
    'test', i, waysToFillArray(t.qs, t.out).join(',') === t.out.join(',')//, 'should be', t.out
))

// console.log(waysToFillArray(bigtest, bigOut))