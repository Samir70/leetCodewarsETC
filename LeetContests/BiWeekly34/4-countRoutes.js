/**
 * given locations, where locations[i] gives position of city i
 * and start, finish cities
 * and fuel
 * count routes from start to finish, which don't run out of fuel
 * fuel used to go i -> j = | loc(i) - loc(j) |
 * 
 */

const countRoutes = (locations, start, finish, fuel) => {

};


const tests = [
    { locs: [2, 3, 6, 8, 4], start: 1, finish: 3, fuel: 5, out: 4 },
    { locs: [4, 3, 1], start: 1, finish: 0, fuel: 6, out: 5 },
    { locs: [5, 2, 1], start: 0, finish: 2, fuel: 3, out: 0 },
    { locs: [2, 1, 5], start: 0, finish: 0, fuel: 3, out: 2 },
    { locs: [1, 2, 3], start: 0, finish: 2, fuel: 40, out: 615088286 }
];

tests.forEach((t, i) => console.log(
    'test', i, countRoutes(t.locs, t.start, t.finish, t.fuel) === t.out
))