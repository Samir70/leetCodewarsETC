const isSquare = n => Math.floor(Math.sqrt(n)**2) === n

const numSquarefulPerms = arr => {
    let count = {};
    for (let a of arr) {
        count[a] = (count[a] || 0) + 1
    }
    let elements = new Set(arr)
    let partners = {}
    for (let a of elements) {
        partners[a] = [];
        for (let b of elements) {
            if (isSquare(a+b)) {partners[a].push(b)}
        }
    }
    console.log(partners, count)
}

const tests = [
    { arr: [1, 8, 17], out: 2 },
    { arr: [1, 8, 17, 8, 1], out: 3 },
    { arr: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], out: 1 },
    { arr: [2, 2, 2], out: 1 }
]

tests.forEach((t, i) => console.log(
    'test', i, numSquarefulPerms(t.arr) === t.out
))