/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function(points) {
  let ps = points.map(p => p[0]).sort((a, b) => a - b)
  let widest = 0
  for (let i = 1; i < ps.length; i++) {
      widest = Math.max(widest, ps[i] - ps[i - 1])
  }  
  return widest
};

const tests = [
  {args: [[[8,7],[9,9],[7,4],[9,7]]], out: 1}, 
  {args: [[[3,100],[9,330],[1,330],[1,334],[5,3333],[8,338]]], out: 3}, 
];

tests.forEach((t, i) => {
  let res = maxWidthOfVerticalArea(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});