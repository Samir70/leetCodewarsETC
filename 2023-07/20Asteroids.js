/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const last = arr => arr.length > 0 ? arr[arr.length - 1] : null
var asteroidCollision = function(asteroids) {
    let stack = []
    for (let n of asteroids) {
      if (n > 0) {
        stack.push(n)
        continue
      }
      while (stack.length > 0 && last(stack) > 0 && n < 0) {
        // console.log({stack, n})
        if (Math.abs(n) === last(stack)) {
          stack.pop();
          n = Infinity;
          // console.log("deleted both")
        } else if (Math.abs(n) > last(stack)) {
          stack.pop()
          // console.log("deleted last of stack")
        } else {
          n = Infinity
        }
      }
      if (n < 0) {stack.push(n)}
    }
    return stack
};

const tests = [
  {args: [[5,10,-5]], out:[5, 10]},
  {args: [[8,-8]], out:[]},
  {args: [[10,2,-5]], out:[10]},
  {args: [[1, 2, -5, -10, 8, 11, 2, 3, -5]], out: [-5,-10,8,11]},
  {args: [[-2,-2,1,-1]], out: [-2,-2]}
];

tests.forEach((t, i) => {
  let res = asteroidCollision(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});