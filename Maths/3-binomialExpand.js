/*
expand("(x+1)^2");      // returns "x^2+2x+1"
expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
expand("(-2a-4)^0");    // returns "1"
expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
expand("(r+0)^203");    // returns "r^203"
expand("(-x-1)^2");     // returns "x^2+2x+1"
*/

const pascalRow = (n) => {
    var row = [1];
    var top = n, bottom = 1;
    while (top > bottom) {
        row.push((row[bottom - 1] * top) / bottom)
        top--; bottom++
    }
    while (top > 0) {
        top--;
        row.push(row[top]);
    }
    return row;
}

const getParts = (str) => {
    var parts = str.split('^');
    var indexOfVar = parts[0].match(/[a-z]/i).index;
    var varName = parts[0][indexOfVar];
    var coeff = parts[0].slice(1, indexOfVar) || '1'
    if (coeff === '-') { coeff += '1' }
    var extra = parts[0].slice(indexOfVar + 1, -1)
    return { varName, coeff: Number(coeff), extra: Number(extra), power: Number(parts[1]) }
}

const expand = (str) => {
    var parts = getParts(str);
    if (parts.power === 0) { return '1' }
    var pRow = pascalRow(parts.power);
    var varExponents = pRow.map((x, i) => parts.power - i);
    var powersOfCoeff = varExponents.map(x => parts.coeff ** x)
    var extraExponents = pRow.map((x, i) => i);
    var powersOfExtra = extraExponents.map(x => parts.extra ** x)
    // console.log({pRow, varExponents, powersOfCoeff, extraExponents, powersOfExtra});
    var finalCoeffs = powersOfCoeff.map((x, i) => x * powersOfExtra[i] * pRow[i]).filter(x => x !== 0)
    // console.log({powersOfCoeff, powersOfExtra, finalCoeffs});
    var outStr = finalCoeffs.map((x, i) => x + parts.varName + '^' + varExponents[i]).join('+');
    outStr = outStr.replace(parts.varName + '^0', '');
    outStr = outStr.replace(parts.varName + '^1+', parts.varName + '+');
    outStr = outStr.replace(parts.varName + '^1-', parts.varName + '-');
    outStr = outStr.replace(/\+\-/g, '-');
    if (outStr.indexOf('1' + parts.varName) === 0) { outStr = outStr.slice(1) }
    if (outStr.indexOf('-1' + parts.varName) === 0) { outStr = '-' + outStr.slice(2) }
    return outStr
}

["(x+1)^2", "(-x-2)^5", "(-28x-1)^0", "(-12t+43)^6", "(2f-4)^16", "(3x+0)^4"].forEach(x =>{
    console.log(x, x.match(/^\((-?\d*)(.)([-+]\d+)\)\^(\d+)$/).slice(0));
    // console.log(x, '=', expand(x))
});
