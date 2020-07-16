function* fibonnaci(a, b) {
    yield a;
    yield b;
    var [previous, current] = [a, b];
    while (true) {
        [previous, current] = [current, previous+current];
        yield current
    }
}

var regFib = fibonnaci(1, 1);
var lucas = fibonnaci(1, 3)

for (var i=0; i<20; i++) {
    console.log('regular Fibonnaci:', regFib.next())
    console.log('start 1, 3', lucas.next())
}