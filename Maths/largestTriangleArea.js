// gives square of area of triangle with sides of length a, b, c
const herons = (a, b, c) => {
    let s = (a + b + c) / 2
    return s * (s - a) * (s - b) * (s - c)
}

const tests = [
    [3, 4, 5], [6, 8, 10], [5, 12, 13]
]

tests.forEach((t, i) => console.log(
    'triangle', i, t, 'has area', herons(...t)
))

// const testPoints = [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]] // 2
const testPoints = [[0, 0], [0, 1], [1, 0], [0, 2], [2, 0], [5, 6], [7, 23], [-5, 6], [6, -5]] // 159.5


const pythag = (a, b) => {
    let dx = a[0] - b[0], dy = a[1] - b[1]
    return Math.sqrt(dx * dx + dy * dy)
}

const largestTriangleArea = points => {
    let max = 0;
    for (let a = 0; a < points.length; a++) {
        for (let b = a + 1; b < points.length; b++) {
            for (let c = b + 1; c < points.length; c++) {
                let [pa, pb, pc] = [points[a], points[b], points[c]];
                let side1 = pythag(pa, pb),
                    side2 = pythag(pa, pc),
                    side3 = pythag(pb, pc);
                let areaSqd = herons(side1, side2, side3)
                if (areaSqd > max) { max = areaSqd }
            }
        }
    }
    return Math.sqrt(max)
}

console.log(largestTriangleArea(testPoints))