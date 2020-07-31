var tribonacci = function(n) {
    var trib = [0, 1, 1];
    if (n < 3) {return trib[n]}
    var i = 2
    while ( i < n) {
        i++
        trib = [trib[1], trib[2],trib[0] + trib[1] + trib[2] ]
    }
    return trib[2]
};

var tribs = [
    0,1,1,2,4,7,13,24,44,81,149,274,504,927,1705,3136,
    5768,10609,19513,35890,66012,121415,223317,410744,755476,
    1389537,2555757,4700770,8646064,15902591,29249425,53798080,98950096,181997601,334745777
]
for (var i = 0; i< 35; i++) {
    var ans = tribonacci(i)
    console.log('trib ', i, 'is', tribonacci(i), ans === tribs[i])
}