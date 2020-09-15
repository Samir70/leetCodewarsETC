// 88ms, 33%
// A faster one used sort, but surely that is slower at O(nlogn)
var maxProduct = function(nums) {
    let first = 0, second = 0;
    for (let n of nums) {
        if (n > second) {
            second = n;
            if (second > first) {
                [first, second] = [second, first]
            }
        }
    }
    return (first - 1)*(second -1)
};

const test = [
  {in: [3,4,5,2], out:12},
  {in: [1, 2], out:0},
  {in: [1,5,4,5], out:16},
  {in: [3, 7], out:12}
]

tests.forEach((t, i) => console.log(
  'test', i, maxProduct(t.in) === t.out
))
