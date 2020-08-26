var fizzBuzz = function (n) {
    return [...Array(n)].map((x, i) => '' + (i + 1))
        .map(x => x % 15 === 0 ? "FizzBuzz" : x % 5 === 0 ? "Buzz" : x % 3 === 0 ? "Fizz" : x)
};

console.log(fizzBuzz(140));

// Extend to more numbers, eg:
// swap = {
//     3: "Fizz",
//     5: "Buzz",
//     7: "Jazz"
// }