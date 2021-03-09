let powers = [
    1,       3,       9,
   27,      81,     243,
  729,    2187,    6561,
19683,   59049,  177147,
531441, 1594323, 4782969,
14348907
];
var checkPowersOfThree = function(n) {
let stack = [...powers]
while (n > 0 && stack.length) {
   let cur = stack.pop()
   if (cur <= n) {n -= cur}        
}
return n === 0
};

// but could have bailed early with false if n remained greater than cur.