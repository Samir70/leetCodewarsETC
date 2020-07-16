var Solution = function(w) {
    this.thresholds = [];
    this.total = 0
    w.forEach(e => {
        this.total += e;
        this.thresholds.push(this.total)
    });
    console.log(this.thresholds)
};

Solution.prototype.pickIndex = function() {
    var r = Math.floor(Math.random()*this.total)+1
    return this.thresholds.findIndex(x => x>=r)
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */

const tests = [
    [1, 3],
    [1],
    [1, 2, 5, 3, 6, 1, 0, 5]
];

tests.forEach(t => {
    var obj = new Solution(t);
    var results = {}
    for (var i = 0; i<1000; i++) {
        var chosen = obj.pickIndex();
        results[chosen] = results[chosen] === undefined ? 1 : results[chosen]+1
    }
    console.log(t,'gives', results)
})