/**
 * given locations, where locations[i] gives position of city i
 * and start, finish cities
 * and fuel
 * count routes from start to finish, which don't run out of fuel
 * fuel used to go i -> j = | loc(i) - loc(j) |
 * https://leetcode.com/problems/count-all-possible-routes/
 */
let memo = {}
let base = 10**9 + 7
const key = (a, b) => [a, b].join(", ")
const helper = (locations, start, finish, fuel, path) => {
  // if (start === finish) {
  //   console.log(`Made it to ${finish}!!!!!!!!!!!!! with fuel = ${fuel}. path: ${path}`)
  // }
  if (fuel < 0) {return 0}
  // if (fuel === 0) {return start === finish ? 1 : 0}
  let ans = start === finish ? 1 : 0
  for (let nextCity = 0; nextCity < locations.length; nextCity++) {
    if (nextCity === start) {continue}
    let fuelAtNextCity = fuel - Math.abs(locations[start] - locations[nextCity])
    let k = key(nextCity, fuelAtNextCity)
    // console.log({wantToGoTo: nextCity, fuel, key: k})
    if (memo[k] === undefined) {
      // console.log("calling helper with", {nextCity, finish, fuel: fuel - Math.abs(locations[start] - locations[nextCity])})
      memo[k] = helper(locations, nextCity, finish, fuelAtNextCity, path + nextCity) % base
      // console.log(`Set memo[${k}] to ${memo[k]}`)
    }
    ans = (ans + memo[k]) % base
  } 
  // console.log({start, fuel, path}, memo, ans) 
  return ans
}

const countRoutes = (locations, start, finish, fuel) => {
  memo = {}
  let ans = start === finish ? 1 : 0
  for (let nextCity = 0; nextCity < locations.length; nextCity++) {
    if (nextCity === start) {continue}
    // console.log("Main calling helper with", {nextCity, finish, fuel: fuel - Math.abs(locations[start] - locations[nextCity])})
    ans = (ans + helper(locations, nextCity, finish, fuel - Math.abs(locations[start] - locations[nextCity]), ""+nextCity)) % base
  }  
  console.log(memo)
  return ans
};


const tests = [
    // { args: [[2, 3, 6, 8, 4],  1, 3, 5], out: 4 },
    // { args: [[4, 3, 1],  1, 0, 6], out: 5 },
    // { args: [[5, 2, 1],  0, 2, 3], out: 0 },
    // { args: [[2, 1, 5],  0, 0, 3], out: 2 },
    { args: [[1, 2, 3],  0, 2, 40], out: 615088286 }
];

tests.forEach((t, i) => {
  let res = countRoutes(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});