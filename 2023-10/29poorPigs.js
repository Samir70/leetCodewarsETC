/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function(buckets, minutesToDie, minutesToTest) {
  let attempt = Math.floor(minutesToTest / minutesToDie);
  let rawAns = '' + Math.log(buckets) / Math.log(attempt + 1)
  rawAns = rawAns.length > 7 ? [...rawAns].slice(0, 8).join("") : rawAns
  return Math.ceil(Number(rawAns))
};

// var poorPigs = function(buckets, minutesToDie, minutesToTest) {
//   let max_time = minutesToTest / minutesToDie + 1;
//   let req_pigs = 0;
//   while (Math.pow(max_time, req_pigs) < buckets)
//       ++req_pigs;
//   return req_pigs;
// };

const tests = [
  { args: [4, 15, 15], out: 2 },
  { args: [4, 15, 30], out: 2 },
  { args: [928, 2, 97], out: 2 },
  { args: [125, 1, 4], out: 3 },
];

tests.forEach((t, i) => {
  let res = poorPigs(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});