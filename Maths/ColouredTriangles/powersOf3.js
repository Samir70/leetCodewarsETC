const goodLengths = [];
var lastPower = 1
for (var i=1; i<11; i++) {
    lastPower *= 3;
    goodLengths.push(lastPower*2+1)
}

console.log(goodLengths)