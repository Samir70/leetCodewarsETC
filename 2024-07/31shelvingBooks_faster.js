/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function (books, shelfWidth) {
  const memo = {}
  // let count = 0
  const helper = (i, spaceLeft, maxHeight) => {
    // count++
    let [w, h] = books[i]
    let newMaxHeight = Math.max(h, maxHeight)
    if (i === books.length - 1) {
      return spaceLeft >= w ? newMaxHeight : maxHeight + h
    }
    let key = [i, spaceLeft, maxHeight].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    let newShelf = maxHeight + helper(i + 1, shelfWidth - w, h)
    let sameShelf = spaceLeft >= w ? helper(i + 1, spaceLeft - w, newMaxHeight) : Infinity
    memo[key] = Math.min(newShelf, sameShelf)
    return memo[key]
  }
  let out = helper(0, shelfWidth, 0)
  // console.log(count)
  return out
};


const { books, shelfWidth } = require("./31bigTest")
const tests = [
  { args: [[[1, 1], [2, 3], [2, 3], [1, 1], [1, 1], [1, 1], [1, 2]], 4], out: 6 },
  { args: [[[1, 3]], 6], out: 3 },
  { args: [[[1, 3], [6, 4]], 6], out: 7 },
  { args: [[[1, 3], [2, 4], [3, 2]], 6], out: 4 },
  { args: [books, shelfWidth], out: 15672 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = minHeightShelves(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});