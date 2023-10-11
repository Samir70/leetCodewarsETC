/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
// turns out to be slower and use more memory
var fullBloomFlowers = function (flowers, people) {
  let events = { 0: 0 }
  for (let [start, end] of flowers) {
    events[start] = (events[start] || 0) + 1
    events[end + 1] = (events[end + 1] || 0) - 1
  }
  let times = Object.keys(events).sort((a, b) => a - b)
  let prefixSums = [], flowersInBloom = 0;
  for (let t of times) {
    flowersInBloom += events[t]
    prefixSums.push([t, flowersInBloom])
  }
  // console.log(prefixSums)

  let ans = []
  for (let person of people) {
    let left = 0, right = prefixSums.length - 1;
    while (left < right) {
      let mid = left + Math.floor((right - left) / 2) + 1
      // console.log({person, left, mid, right})
      if (prefixSums[mid][0] > person) {
        right = mid - 1
      } else {
        left = mid
      }
    }
    ans.push(prefixSums[left][1])
  }

  return ans
};


let randFlowers = [], randPeople = []
for (let i = 0; i < 20; i++) {
  let s = Math.floor(Math.random() * 500) + 1
  let e = s + Math.floor(Math.random() * 500)
  randFlowers.push([s, e])
}
for (let i = 0; i < 5; i++) {
  randPeople.push(Math.floor(Math.random() * 700) + 5)
}
// console.log({ randFlowers, randPeople })
const tests = [
  { args: [[[1, 6], [3, 7], [9, 12], [4, 13]], [2, 3, 7, 11]], out: [1, 2, 2, 2] },
  { args: [[[1, 10], [3, 3]], [3, 3, 2]], out: [2, 2, 1] },
  { args: [[[19, 37], [19, 38], [19, 35]], [6, 7, 21, 1, 13, 37, 5, 37, 46, 43]], out: [0, 0, 3, 0, 0, 2, 0, 2, 0, 0] },
  { args: [[[475, 941], [263, 543], [75, 502], [477, 672], [395, 711], [369, 864], [205, 560], [123, 253], [3, 95], [317, 365], [309, 466], [265, 484], [26, 457], [451, 764], [462, 927], [70, 296], [204, 596], [91, 255], [398, 666], [371, 500]], [38, 195, 36, 225, 176]], out: [2, 5, 2, 7, 5] }
];

tests.forEach((t, i) => {
  // if (i !== 2) { return }
  let res = fullBloomFlowers(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});