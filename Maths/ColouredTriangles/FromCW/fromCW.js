function triangle(row) {
  while (row.length > 1) {
    let factor = 1, newRow = "";
    while (row.length % (3 * factor) === 1) factor *= 3;
    for (let i = 0; i < row.length - 1; i += factor) {
      newRow += next(row[i], row[i + factor]);
    }
    row = newRow;
  }
  return row;
}

function next(a, b) {
  if (a == b) return a;
  if (a != "R" && b != "R") return "R";
  if (a != "G" && b != "G") return "G";
  if (a != "B" && b != "B") return "B";
}