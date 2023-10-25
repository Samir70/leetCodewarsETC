/**
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
let memo = {
  0: '01',
  1: '10'
}
var kthGrammar = function (n, k) {
  let cur = '0', row = 1, rowLength = 2 ** (n - 1);
  while (row < n) {
    cur = memo[cur];
    row++; rowLength = rowLength >> 1;
    cur = k > rowLength ? cur[1] : cur[0]
    k = k % rowLength;
    if (k === 0) { k += rowLength }
    // console.log({ row, cur, rowLength, k })
    if (cur.length >= k) { return cur[k - 1] }
  }
  return cur
};

const tests = [
  { args: [1, 1], out: '0' },
  { args: [2, 1], out: '0' },
  { args: [2, 2], out: '1' },
  { args: [5, 10], out: '0' },
  { args: [30, 145], out: '0' },
  { args: [30, 14567884], out: '0' },
  { args: [30, 14567883], out: '1' },
];

tests.forEach((t, i) => {
  let res = kthGrammar(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});