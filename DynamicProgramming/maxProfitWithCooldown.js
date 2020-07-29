// can have more than one transaciton, but cannot buy the day immediately after when you sell
var maxProfit = function (prices) {
    if (prices.length < 2) {return 0}
    if (prices.length === 2) {return Math.max(0, prices[1]-prices[0])}
    /**
     * you can be in three situations: 
     * -- share account is EMPTY
     * -- you OWN a share
     * -- you just sold so are RESTING
     * how much profit do you have after getting into these states?
     * if you finish today 
     * -- EMPTY, then either you were empty yesterday or you sold your share yesterday
     * -- OWNing a share, then either you owned a share yesterday or you bought one today
     * -- RESTING, then you sold a share you had yesterday 
     */
    // vars for yesterday
    var empty = 0, own = -Infinity, resting = 0;
    for (var p of prices) {
        emptyToday = Math.max(empty, resting);
        ownToday = Math.max(own, empty-p);
        restingToday = own+p
        empty = emptyToday;
        own = ownToday;
        resting = restingToday
    }
    return Math.max(resting, empty)
};

const tests = [
    { in: [1], out: 0 },
    { in: [1, 2], out: 1 },
    { in: [5, 2], out: 0 },
    { in: [1, 2, 3, 0, 2], out: 3 },
    { in: [1, 2, 5, 0, 2], out: 4 }
];

tests.forEach((t, i) =>  console.log(
    'test', i, maxProfit(t.in) === t.out ? true : maxProfit(t.in) + ' is WRONG!!!!!!'
))