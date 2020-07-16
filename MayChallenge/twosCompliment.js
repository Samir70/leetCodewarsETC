const twosComp = (n) => {
    var power2 = 1;
    while (power2-1<n) {power2 *=2}
    return power2-n-1
}

for (var i=0; i<10; i++) {
    var test = Math.floor(Math.random()*2**10);
    const comp = twosComp(test)
    console.log(test, test.toString(2), comp, comp.toString(2), 'sum:', test+comp)
}

[1, 0, 32, 64, 31, 23453425, 33].forEach(test => {
    const comp = twosComp(test)
    console.log(test, test.toString(2), comp, comp.toString(2), 'sum:', test+comp);
})