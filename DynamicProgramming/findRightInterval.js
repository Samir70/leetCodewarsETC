// beats only 25%
var findRightInterval = function(intervals) {
    if (intervals.length === 1) {return [-1]};
    let indexHash = new Map();
    for (let i in intervals) {
        let key = intervals[i].join(',');
        indexHash.set(key, i)
    }
    let sorted = [...intervals].sort((a, b) => a[0]-b[0]);
    // console.log(indexHash, sorted)
    let minRightOf = new Map();
    for (let i =0; i<sorted.length; i++) {
        let key = sorted[i].join(',');
        let endTime = sorted[i][1]
        let j = i+1;
        while (j < sorted.length && sorted[j][0] < endTime) {j++}
        minRight = j === sorted.length ? -1 : sorted[j].join(',')
        minRightOf.set(key, minRight)
    }
    // console.log(minRightOf);
    let out = [];
    for (let i = 0; i<intervals.length; i++) {
        let key = intervals[i].join(',');
        let minRightIndex = minRightOf.get(key) === -1 ? -1 : indexHash.get(minRightOf.get(key))
        out.push(minRightIndex)
    }
    return out
};

const tests = [
  {in:[ [1,2] ], out: [-1]},
  {in: [ [3,4], [2,3], [1,2] ], out: [-1, 0, 1]},
  {in: [ [1,4], [2,3], [3,4] ], out: [-1, 2, -1]}
];

tests.forEach((t, i) => console.log(
  'test', i, findRightInterval(t.in), 'should be', t.out
))
