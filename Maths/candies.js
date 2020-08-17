var distributeCandies = function (candies, num_people) {
    // find largest triangular number <= candies
    // c = n(n+1)/2;
    // 2n = -1 + sqrt(1+8c)
    const whichTri = Math.floor((Math.sqrt(1 + 8 * candies) - 1) / 2);
    // how many times completely thru cycle?
    const timesThru = Math.floor(whichTri / num_people);
    // how many in last attempt at cycle?
    const inLast = whichTri % num_people;
    console.log('candies, whichTri', candies, whichTri, 'split as', timesThru, inLast);
    /**
     * if you made it through the cycle 3 times, then the first person gets
     * 1 + (n+1) + (2n+1)
     */
    const tri = n => n < 1 ? 0 : n * (n + 1) / 2
    var out = Array(num_people);
    var handedOut = 0
    for (var i = 0; i < num_people; i++) {
        let giveCandies = timesThru * (i + 1) + tri(timesThru - 1) * num_people;
        out[i] = giveCandies;
        handedOut += giveCandies
    }
    console.log('midway', out)
    let c = 0, base = timesThru * num_people
    let leftOver = candies - handedOut;
    console.log('leftOver:', leftOver)
    while (leftOver > 0) {
        let toAdd = base + c + 1
        out[c] += leftOver >= toAdd ? toAdd : leftOver
        leftOver -= leftOver >= toAdd ? toAdd : leftOver
        c++;
    }
    return out
};

/**
 * for n people
 * 1    2   3   4   ..., c, ... n
 * n+2  n+4 n+6 n+8 ..., n+2c, ... 2n
 * 3n+3  3n+6 3n+9 3n+12 ..., 3n+3c, ... 3n
 * 6n+4  6n+8 6n+12  6n+16 ..., 6n+4c   
 */

const tests = [
    { candies: 7, num_people: 4, out: [1, 2, 3, 1] },
    { candies: 10, num_people: 3, out: [5, 2, 3] },
    { candies: 100, num_people: 3, out: [35, 35, 30] }
];

tests.forEach((t, i) => console.log(
    'test', i, distributeCandies(t.candies, t.num_people), 'should be', t.out
))