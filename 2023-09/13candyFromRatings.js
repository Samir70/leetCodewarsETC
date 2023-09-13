// 72ms beats nearly 99%
const direction = (a, b) => b > a ? 1 : b === a ? 0 : -1
const tri = n => n * (n + 1) / 2
const candy = ratings => {
  if (ratings.length === 1) { return 1 }
  if (ratings.length === 2) { return ratings[0] === ratings[1] ? 2 : 3 }
  // first pass: analyse array into subarrays that are inc/same/decreasing
  let arr = [];
  let diff = direction(ratings[0], ratings[1])
  let count = 2;
  for (let i = 2; i < ratings.length; i++) {
    let d = direction(ratings[i - 1], ratings[i])
    if (d === diff) {
      count++
    } else {
      arr.push([count, diff]);
      diff = d;
      count = 2
    }
  }
  if (count === ratings.length) {
    return diff === 0 ? count : tri(count)
  }
  arr.push([count, diff])
  // console.log(ratings, arr)
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let [count, d] = arr[i]
    let nextD = i < arr.length - 1 ? arr[i + 1][1] : null
    if (d === 1) {
      sum += tri(count)
      if (nextD === -1) { sum -= Math.min(count, arr[i + 1][0]) }
    }
    if (d === -1) {
      sum += tri(count)
      if (nextD === 1) { sum-- }
    }
    if (d === 0) {
      sum += count
      if (i !== 0) { sum-- }
      if (nextD !== null) { sum-- }
    }
    // console.log([count, d], sum)
  }
  return sum
}

const tests = [
  { args: [[1, 2, 3]], out: 6 },
  { args: [[3, 2, 1]], out: 6 },
  { args: [[2, 2, 2]], out: 3 },
  { args: [[1, 0, 2]], out: 5 },
  { args: [[1, 2, 2]], out: 4 },
  { args: [[1, 2, 2, 1]], out: 6 },
  { args: [[1, 2, 2, 1, 3, 4, 4, 4, 4, 4]], out: 15 },
  { args: [[1, 2, 2, 1, 3, 4, 4, 4, 4, 4, 3]], out: 17 },
  { args: [[1, 2, 2, 1, 3, 4, 4, 4, 4, 4, 3, 2]], out: 20 },
  { args: [[1, 2, 2, 1, 3, 4, 4, 4, 4, 4, 3, 2, 1]], out: 24 },
  { args: [[1, 2, 2, 1, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0]], out: 29 },
  { args: [[3, 4, 5, 4, 3, 2, 1]], out: 18 },
  { args: [[1, 3, 4, 5, 2]], out: 11 }
];

tests.forEach((t, i) => {
  let res = candy(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
