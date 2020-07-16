function* hailstone(start) {
    var current = start;
    while (current > 2) {
        current = current % 2 ? 3 * current + 1 : current / 2
        yield current
    }
    return 1
}

var from10 = hailstone(27)
var getnext = true
while (getnext) {
    var n = from10.next()
    console.log(n)
    getnext = !n.done
}
// for (var i = 0; i<10; i++) {
//     var n = from10.next()
//     console.log(n)
// }