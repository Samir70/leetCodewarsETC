/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function (books, shelfWidth) {
  const memo = {}
  let count = 0
  const helper = (i, wUsed, curH, prevH) => {
    // if (i === 1) { console.log({ i, wUsed, curH, prevH }) }
    count++
    let key = [i, wUsed, curH, prevH].join(",")
    if (memo[key] !== undefined) { return memo[key] }
    if (i === books.length) {
      memo[key] = curH + prevH
      return curH + prevH
    }
    let [w, h] = books[i]
    if (wUsed + w > shelfWidth) {
      return helper(i + 1, w, h, prevH + curH)
    } else {
      let useNewShelf = helper(i + 1, w, h, prevH + curH)
      curH = Math.max(curH, h)
      let useSameShelf = helper(i + 1, wUsed + w, curH, prevH)
      memo[key] = Math.min(useNewShelf, useSameShelf)
      return memo[key]
    }
  }
  let out = helper(0, 0, 0, 0)
  console.log(count);
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