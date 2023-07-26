const timeToTravel = (dists, speed) => {
  times = dists.map(d => Math.ceil(d / speed))
  times[times.length - 1] = dists[dists.length - 1] / speed
  // console.log({dists, speed, times})
  return times.reduce((a, c) => a + c, 0)
}
/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {
  let left = Math.floor(dist.reduce((a, c) => a + c, 0) / hour);
  let right = 10**7
  if (timeToTravel(dist, right) > hour) {return -1}
  // below not needed since Q says max answer is 10^7
  // if (dist[dist.length - 1] === right) {
  //   let roundedHours = dist.length - 1
  //   let timeLeft = hour - roundedHours
  //   if (timeLeft <= 0) { return -1 }
  //   right = Math.max(right, right/timeLeft)
  // } else if (timeToTravel(dist, right) > hour) { 
  //   let roundedHours = dist.length - 1
  //   let timeLeft = hour - roundedHours
  //   if (timeLeft <= 0 || timeLeft > 1) { return -1 }
  //   right = right / timeLeft
  // }
  // console.log({dist, hour, speed:left, time: timeToTravel(dist, left)})
  // console.log({dist, hour, speed: right, time: timeToTravel(dist, right)})
  let count = 0
  while (left < right) {
    count++
    let mid = Math.floor((left + right) / 2)
    let time = timeToTravel(dist, mid)
    if (time > hour) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  // console.log({count})
  return left
  // from when left and right could be floats
  // let minSpeed = Math.floor(left)
  // return timeToTravel(dist, minSpeed) <= hour ? minSpeed : Math.ceil(left)
};

const tests = [
  { args: [[1, 3, 2], 6], out: 1 },
  { args: [[1, 3, 2], 2.7], out: 3 },
  { args: [[1, 3, 2], 1.9], out: -1 },
  { args: [[1, 1, 100000], 2.01], out: 10000000 },
  { args: [[5, 3, 4, 6, 2, 2, 7], 10.92], out: 4 },
  { args: [[3, 6, 888, 4, 2234, 45, 4], 12], out: 447 },
];

tests.forEach((t, i) => {
  // if (i !== 4) {return}
  let res = minSpeedOnTime(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});