var getMaximumConsecutive = function (coins) {
    coins.sort((a, b) => a - b);
    let out = 0;
    let i = 0;
    // [1, 1, 1, 4, 8]
    // can make 1, 2, 3, [4..7], [8..15]
    while (coins[i] <= out + 1) {
        out += coins[i];
        i++;
    }
    return out + 1
};

const tests = [
    { coins: [1, 3], out: 2 },
    { coins: [1, 1, 1, 4], out: 8 },
    { coins: [1, 4, 10, 3, 1], out: 20 },
    { coins: [1, 1, 1, 4, 8], out: 16 }
]

tests.forEach((t, i) => console.log(
    'test', i, console.log(getMaximumConsecutive(t.coins) === t.out)
))