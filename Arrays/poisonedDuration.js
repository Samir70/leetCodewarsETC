// timelimit exceeded:
var findPoisonedDuration_slow = function (timeSeries, duration) {
    console.log(timeSeries.slice(0, 10))
    let condition = 0, timePoisoned = 0;
    let i = 0, seconds = 0;
    while (i < timeSeries.length) {
        if (condition > 0) { timePoisoned++; condition-- }
        if (timeSeries[i] === seconds) {
            condition = duration;
            i++
        }
        seconds++
    }
    return timePoisoned + condition
};

const findPoisonedDuration = (timeSeries, duration) => {
    if (timeSeries.length === 0) { return 0 }
    let timePoisoned = 0;
    for (let i = 1; i < timeSeries.length; i++) {
        timePoisoned += Math.min(duration, timeSeries[i] - timeSeries[i - 1])
    }
    return timePoisoned + duration
}

const bigTest = require('./bigIncreasingArray');
const tests = [
    { arr: [1, 4, 5, 8, 12, 13, 66], duration: 5, out: 22 },
    { arr: [1, 4, 5, 8, 12, 13, 66], duration: 3, out: 17 },
    { arr: bigTest.bigIncArray, duration: 5, out: 49771 },
    // annoying!
    { arr: [], duration: 544, out: 0 }
];

tests.forEach((t, i) => console.log(
    'test', i, findPoisonedDuration(t.arr, t.duration), 'should be', t.out
))