const intervalIntersection = (a, b) => {
    if (a.length === 0 || b.length === 0) {return []}
    var pointerA = 0, pointerB = 0;
    var overlap = [];
    while (pointerA < a.length && pointerB < b.length) {
        var intA = a[pointerA], intB = b[pointerB];
        console.log("comparing", intA, intB)
        if (intA[1] < intB[0]) {pointerA++; continue}
        if (intB[1] < intA[0]) {pointerB++; continue}
        var oLap = [Math.max(intA[0], intB[0]), Math.min(intA[1], intB[1])];
        overlap.push(oLap);
        if (intA[1]<intB[1]) {
            pointerA++
        } else if (intB[1]<intA[1]) {
            pointerB++
        } else {
            pointerA++;
            pointerB++
        }
    }
    return overlap
}

const tests = [
    {
        a: [[0, 2], [5, 10], [13, 23], [24, 25]],
        b: [[1, 5], [8, 12], [15, 24], [25, 26]],
        out: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]
    }
]

tests.forEach(t => console.log(intervalIntersection(t.a, t.b)))