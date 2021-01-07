/**
 * flip horisontally then invert.
 * Can be done with mapping, but that is slower.
 */
// calculate outcome for each row
const change = row => {
    let left = 0, right = row.length-1;
    while (left < right) {
        if (row[left] === row[right]) {
            row[left] = 1 - row[left]
            row[right] = 1 - row[right]
        }
        left++; right--
    }
    if (left === right) {
        row[left] = 1 - row[left]
    }
    return row
}
const flipAndInvertImage = arr => arr.map(change)