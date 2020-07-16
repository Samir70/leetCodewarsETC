const pairs = {
    GG: 'G', RR: 'R', BB: 'B', RG: 'B', GR: 'B', GB: 'R', BG: 'R', BR: 'G', RB: 'G'
}
const reduceFiver = (fiver) => {
    if (fiver.length === 1) { return fiver }
    var newRow = '';
    for (var i = 0; i < fiver.length - 1; i++) {
        newRow += pairs[fiver[i] + fiver[i + 1]]
    }
    //console.log(fiver, '-->', newRow);
    return reduceFiver(newRow);
}


var preReduced = {}
const triangle = (row) => {
    if (row.length <= 5) { return reduceFiver(row) }
    var newRow = '';
    for (var i = 0; i <= row.length - 5; i++) {
        var fiveLetter = row.slice(i, i + 5);
        newRow += preReduced[fiveLetter] || reduceFiver(fiveLetter)
    }
    console.log('reduced', row, ' 5 at a time to ', newRow);
    return triangle(newRow);
}
// Didn't save enough time, used too much memory