/**
 * @param {string} corridor
 * @return {number}
 */
const base = 10**9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
var numberOfWays = function (corridor) {
  let seatIndex = []
  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {seatIndex.push(i)}
  }
  if (seatIndex.length % 2) {return 0}
  if (seatIndex.length === 0) {return 0}
  // console.log(seatIndex)
  let out = 1
  let i = 1;
  while (i < seatIndex.length - 1) {
    let numDividers = seatIndex[i + 1] - seatIndex[i]
    out = multMod(out, numDividers)
    // console.log({i, out, numDividers})
    i += 2;
  }
  return out
};

const tests = [
  { args: ["SSPPSPS"], out: 3 },
  { args: ["SSPPSPSS"], out: 0 },
  { args: ["PPSPSP"], out: 1 },
  { args: ["S"], out: 0 },
  { args: ["P"], out: 0 },
  { args: ["PPPPPSPPSPPSPPPSPPPPSPPPPSPPPPSPPSPPPSPSPPPSPSPPPSPSPPPSPSPPPPSPPPPSPPPSPPSPPPPSPSPPPPSPSPPPPSPSPPPSPPSPPPPSPSPSS"], out: 919999993 },
];

tests.forEach((t, i) => {
  let res = numberOfWays(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});