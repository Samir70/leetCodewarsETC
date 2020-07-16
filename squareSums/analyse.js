const { sumPairs, tally } = require('./verifySols');
const { reachableSqs } = require('./reachableSqs');
const { splitLR } = require('./splitLR');
const { roadMap } = require('./5-followRoadMap')
const { shortPaths, startWithPath15, squarePathsResults, pathsFor27 } = require('./tests');
const signedSquares = (arr) => sumPairs(arr).map((x, i) => i%2 ? -x : x)


// for (var i in pathsFor27) {
//     // console.log(i+' mod4:'+startWithPath15[i].map(x=>x%4))
//     console.log(sumPairs(pathsFor27[i]).join(', '))
//     // console.log(i+' mod16:'+startWithPath15[i].map(x=>x%16))
// }


// var n = 26;
// var rMap = roadMap(n);
// var path = shortPaths[n];
// var squares = sumPairs(path);
// var signedSqs = signedSquares(path);
// var leftSqs = squares.filter((_, i) => i%2===0);
// var rightSqs = squares.filter((_, i) => i%2);
// var nonA = squares.slice(1).reduce((acc, val, i) => [...acc, val-acc[i]], [squares[0]]);
// var analysis = {
//     path: path.join(','),
//     squares: squares.join(','),
//     sumSquares: tally(squares),
//     reachableSqs: reachableSqs(n),
//     signedSqs: signedSqs.join(','),
//     signedSqsSum: tally(signedSqs),
//     firstAndLast: path.filter((x, i, a)=>i===0 || i===a.length-1),
//     leftSqs: leftSqs.join(','),
//     leftSqsSum: leftSqs.reduce((a, b) => a+b),
//     rightSqs: rightSqs.join(','),
//     rightSqsSum: rightSqs.reduce((a, b) => a+b),
//     nonA : nonA.join(','),
//     nonALeft : nonA.filter((x, i)=>!(i%2)).sort((a, b) => a-b).join(','),
//     nonALeftSum : nonA.filter((x, i)=>!(i%2)).reduce((a, b) =>a+b),
//     nonARight: nonA.filter((x, i)=>i%2).sort((a, b) => a-b).join(','),
//     nonARightSum: nonA.filter((x, i)=>i%2).reduce((a, b) => a+b)
// }

// // console.log(path.map((x, i) => {
// //     if (i===0) {return 'a'}
// //     var sign = i%2 ? '-' : '+'
// //     return nonA[i-1]+sign+'a'
// // }))

// console.log(analysis)
// // console.log(rMap)
// for (var i in rMap.graphLinks) {
//     var ind = path.indexOf(Number(i));
//     var left = ind === 0 ? 0 : ind - 1;
//     var segment = path.slice(left, ind+2);
//     console.log(i, rMap.graphLinks[i], segment, sumPairs(segment))
// }

// console.log(path.join(','));
// var {left, right} = splitLR(path);
// console.log(left, right);
// console.log(splitLR(left));
// console.log(splitLR(right));


const analyse = (arr) => {
    var left, right, middle, mid;
    arr.forEach(p => {
        if (p.length % 2) {
            mid = (p.length - 1)/2
            left = p.slice(0, mid);
            right = p.slice(mid+1);
            middle = p[mid]
        } else {
            mid = p.length / 2;
            middle = [p[mid-1], p[mid]];
            left = p.slice(0, 5);
            right = p.slice(mid)
        }
        if (middle === 12) {
            console.log({
                left, 
                leftsum: left.reduce((a, b) => a+b),
                middle, 
                right,
                rightSum: right.reduce((a, b) => a+b)
            });
        }
    })
}

analyse(pathsFor27);