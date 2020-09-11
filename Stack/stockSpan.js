/**
 * if the price of a stock over the next 7 days were
 *  [100, 80, 60, 70, 60, 75, 85], then the stock spans would be
 *  [1, 1, 1, 2, 1, 4, 6].
 The span of the stock's price today is defined as the maximum number of consecutive days 
 (starting from today and going backwards) for which the price of the stock was 
 less than or equal to today's price.
*/

class StockSpanner {
    constructor() {
        this.stocks = [[Infinity, 0]]
        this.count = 0
    }
    next(val) {
        while (this.stocks[this.stocks.length - 1][0] <= val ) {this.stocks.pop()}
        var dist = this.stocks[this.stocks.length - 1][1]
        this.count++;
        this.stocks.push([val, this.count]);
        return this.count - dist
    }
}


/** 
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

const tests = [
    {in:[100, 80, 60, 70, 60, 75, 85], out:[1, 1, 1, 2, 1, 4, 6]},
    {in:[5, 7, 9, 8, 6, 6, 7, 8, 10], out:[ 1, 2, 3, 1, 1, 2, 3, 5, 9 ]}
];

tests.forEach(t => {
    var obj = new StockSpanner();
    var spans = [];
    t.in.forEach(stock => spans.push(obj.next(stock)));
    console.log(spans, spans.join(',') === t.out.join(','))
})
