/**
 * @param {string[]} timePoints
 * @return {number}
 */
const string2Dec = str => {
  let [h, m] = str.split(":").map(Number)
  return h + m / 60
}
const stringToMins = str => {
  let [h, m] = str.split(":").map(Number)
  return h * 60 + m
}
var findMinDifference = function (timePoints) {
  // let times = timePoints.map(string2Dec).sort((a, b) => a - b)
  let times = timePoints.map(stringToMins).sort((a, b) => a - b)
  // console.log(times)
  let diff = 24 * 60 - times[times.length - 1] + times[0]
  for (let i = 1; i < times.length; i++) {
    diff = Math.min(diff, times[i] - times[i - 1])
  }
  return diff
  // return Math.round(diff * 60)
};

const { bigtest } = require("./16bigtest")

const tests = [
  { args: [["23:59", "00:00"]], out: 1 },
  { args: [["00:00", "23:59", "00:00"]], out: 0 },
  { args: [["00:00", "12:00"]], out: 720 },
  { args: [["23:30", "00:10"]], out: 40 },
  { args: [["00:00", "12:00", "23:59"]], out: 1 },
  { args: [["02:45", "11:15", "18:30", "23:55"]], out: 170 },
  { args: [["00:00", "12:34", "23:59", "03:21", "16:45", "07:30", "20:15", "22:22"]], out: 1 },
  { args: [bigtest], out: 0 }
]

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = findMinDifference(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});