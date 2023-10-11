/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
var fullBloomFlowers = function (flowers, people) {
  let startTimes = flowers.map(f => f[0]).sort((a, b) => a - b);
  let endTimes = flowers.map(f => f[1]).sort((a, b) => a - b);
  let sortedPeople = [...people].sort((a, b) => a - b);
  let hash = {}
  let started = 0, finished = 0;
  for (let person of sortedPeople) {
    while (startTimes[started] <= person) { started++ }
    while (endTimes[finished] < person) { finished++ }
    hash[person] = started - finished
  }
  return people.map(p => hash[p] || 0)
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
  { args: [[[475, 941], [263, 543], [75, 502], [477, 672], [395, 711], [369, 864], [205, 560], [123, 253], [3, 95], [317, 365], [309, 466], [265, 484], [26, 457], [451, 764], [462, 927], [70, 296], [204, 596], [91, 255], [398, 666], [371, 500]], [ 38, 195, 36, 225, 176 ]], out: [2, 5, 2, 7, 5] }
];

tests.forEach((t, i) => {
  let res = fullBloomFlowers(...t.args);
  if (res.join(",") !== t.out.join(",")) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});