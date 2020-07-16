// binary tree of squares 1..n^2, each node has a lower and a higher branch
// midSquare is the square in the middle

const reachableSquares = (n) => {
    var limit = Math.floor(Math.sqrt(n + n - 1));
    return [...Array(limit)].map((x, i) => (i + 1) ** 2).slice(1)
}

class Square {
    constructor(sq) {
        this.value = sq;
        this.lower = null;
        this.higher = null;
    }
}

const makeTree = (arr) => {
    var len = arr.length;
    if (len === 0) { return null }
    if (len === 1) { return new Square(arr[0]) }
    var mid = len % 2 ? (len - 1) / 2 : len / 2
    var head = new Square(arr[mid]);
    head.lower = makeTree(arr.slice(0, mid))
    if (len === 2) { return head }
    head.higher = makeTree(arr.slice(mid + 1))
    return head
}

const showLayers = (tree) => {
    var layers = [[tree]]
    var layer = 0;
    while (layers[layer].length > 0) {
        // console.log('layers:', layers)
        nextLayer = [];
        layers[layer].forEach(n => {
            newElements = [n.lower, n.higher].filter(x => x !== null);
            nextLayer = nextLayer.concat(newElements)
        });
        layer++;
        layers[layer] = nextLayer 
    }
    return layers.map(x => x.map(n => n.value))
}

const isListed = (n, tree) =>{
    if (n === tree.value) {return true}
    if (n < tree.value) {
        return tree.lower !== null ? isListed(n, tree.lower) : false
    } 
    return tree.higher !== null ? isListed(n, tree.higher) : false
}

const n = 210100
const sqList = reachableSquares(n)
console.log(sqList.length, 'reachable squares')
var test = makeTree(reachableSquares(n));
// console.log(JSON.stringify(test));
// console.log(showLayers(test));

const searches = 1000000;
const maxSq = sqList.slice(-1)[0];
var squaresFound = 0;
start = new Date().getTime();
for (var i = 1; i<searches; i++) {
    const randomInt = Math.floor(Math.random()*maxSq +1);
    var bool = isListed(randomInt, test);
    bool && squaresFound++;
}
end = new Date().getTime();
console.log('checking via tree:', squaresFound, 'squares found in', end-start, 'milliseconds')

start = new Date().getTime();
squaresFound = 0;
for (var i = 1; i<searches; i++) {
    const randomInt = Math.floor(Math.random()*maxSq +1);
    const root = Math.floor(Math.sqrt(randomInt))
    var bool = (root*root === randomInt)
    bool && squaresFound++;
}
end = new Date().getTime();
console.log('checking via rooting:', squaresFound, 'squares found in', end-start, 'milliseconds')


start = new Date().getTime();
squaresFound = 0;
for (var i = 1; i<searches; i++) {
    const randomInt = Math.floor(Math.random()*maxSq +1);
    var bool = sqList.includes(randomInt)
    bool && squaresFound++;
}
end = new Date().getTime();
console.log('checking via Array.includes:', squaresFound, 'squares found in', end-start, 'milliseconds')

// for 101
// [                 [ 64 ],
//          [ 25,                144 ],
//     [ 9,        49,      100,        196 ],
//   [ 4, 16,   36,      81, 121,   169 ],
//   [] ]


/**
63 'reachable squares'
checking via tree: 16304 squares found in 117 milliseconds
checking via rooting: 16570 squares found in 37 milliseconds
checking via Array.includes: 16592 squares found in 158 milliseconds

203 'reachable squares'
checking via tree: 4812 squares found in 136 milliseconds
checking via rooting: 4898 squares found in 35 milliseconds
checking via Array.includes: 5027 squares found in 352 milliseconds

647 'reachable squares'
checking via tree: 1557 squares found in 161 milliseconds
checking via rooting: 1599 squares found in 33 milliseconds
checking via Array.includes: 1514 squares found in 1134 milliseconds
 */