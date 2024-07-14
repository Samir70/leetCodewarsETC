/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function (formula) {
  let index = 0
  const isDigit = c => c >= "0" && c <= "9"
  const parseFormula = () => {
    let curTally = {}
    let [curAtom, curCount] = ["", ""]
    while (index < formula.length) {
      let curSymbol = formula[index]
      if (isDigit(curSymbol)) {
        curCount += curSymbol
        index++
      } else if (curSymbol === "(") {
        index++
        let nestedTally = parseFormula()
        for (let atom in nestedTally) {
          curTally[atom] = (curTally[atom] || 0) + nestedTally[atom]
        }
      } else if (curSymbol === ")") {
        curTally[curAtom] = (curTally[curAtom] || 0) + (Number(curCount) || 1)
        index++
        let multiplier = ""
        while (isDigit(formula[index])) {
          multiplier += formula[index++]
        }
        multiplier = Number(multiplier)
        if (multiplier > 0) {
          for (let atom in curTally) {
            curTally[atom] *= multiplier
          }
        }
        // console.log({curSymbol, curTally, multiplier})
        return curTally
      } else if (curSymbol.toLowerCase() === curSymbol) {
        curAtom += curSymbol
        index++
      } else if (curSymbol.toUpperCase() === curSymbol) {
        curTally[curAtom] = (curTally[curAtom] || 0) + (Number(curCount) || 1)
        curAtom = curSymbol
        curCount = ""
        index++
      }
      // console.log({ curSymbol, curTally })
    }
    curTally[curAtom] = (curTally[curAtom] || 0) + (Number(curCount) || 1)
    return curTally
  }
  let tally = parseFormula()
  // console.log(tally)
  let atoms = Object.keys(tally).sort()
  let out = ""
  for (let atom of atoms) {
    if (atom === "") { continue }
    out += atom
    if (tally[atom] > 1) { out += tally[atom] }
  }
  return out
};

const tests = [
  { args: ["H2O"], out: "H2O" },
  { args: ["Mg(OH)2"], out: "H2MgO2" },
  { args: ["K4(ON(SO3)2)2"], out: "K4N2O14S4" },
  { args: ["H11He49NO35B7N46Li20"], out: "B7H11He49Li20N47O35" },
];


tests.forEach((t, i) => {
  let res = countOfAtoms(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});