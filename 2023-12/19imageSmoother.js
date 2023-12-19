/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  // refactored to make changes in place
  // each val in img is 0..255
  const getMean = (r, c) => {
    let sum = 0, count = 0
    for (let rr = r - 1; rr <= r + 1; rr++) {
      for (let cc = c - 1; cc <= c + 1; cc++) {
        if (img[rr] === undefined) { continue }
        if (img[rr][cc] === undefined) {continue}
        sum += img[rr][cc] & 255
        count += 1
      }
    }
    return Math.floor(sum / count) << 8
  }
  for (let r = 0; r < img.length; r++) {
    for (let c = 0; c < img[0].length; c++) {
      img[r][c] += getMean(r, c)
    }
  }
  return img.map(row => row.map(c => c >> 8))
};

const tests = [
  { args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], out: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] },
  { args: [[[100, 200, 100], [200, 50, 200], [100, 200, 100]]], out: [[137, 141, 137], [141, 138, 141], [137, 141, 137]] },
];

tests.forEach((t, i) => {
  let res = imageSmoother(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});