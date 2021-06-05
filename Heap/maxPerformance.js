class Heap {
    // minHeap by default, use -ve for maxHeap
    constructor() {
        this.size = 0;
        this.arr = [null];
    }

    peek() { return this.size > 0 ? this.arr[1] : null }

    bubbleUp(child) {
        if (child > 1) {
            var parent = Math.floor(child / 2);
            if (this.arr[child] < this.arr[parent]) {
                var temp = this.arr[child];
                this.arr[child] = this.arr[parent];
                this.arr[parent] = temp
                this.bubbleUp(parent)
            }
        }
    }

    add(n) {
        this.size++
        this.arr[this.size] = n
        this.bubbleUp(this.size)
    }

    bubbleDown(parent) {
        var child = [this.arr[parent], parent];
        var le = 2 * parent, r = 2 * parent + 1;
        var left = le > this.size ? Infinity : this.arr[le]
        if (left < child[0]) { child = [left, le] }
        var right = r > this.size ? Infinity : this.arr[r];
        if (right < child[0]) { child = [right, r] }
        if (child[1] > parent) {
            var temp = this.arr[parent];
            this.arr[parent] = child[0];
            this.arr[child[1]] = temp;
            this.bubbleDown(child[1])
        }
    }

    poll() {
        var out = this.arr[1];
        this.arr[1] = this.arr[this.size];
        this.arr.pop()
        this.size--
        this.bubbleDown(1);
        return out;
    }
}

const maxPerformance = (n, speed, efficiency, k) => {
    let pairs = [];
    for (let i = 0; i < n; i++) {pairs.push([speed[i], efficiency[i]])}
    pairs.sort((a, b) => a[1] - b[1]);
    console.log(pairs)
    let fastest = new Heap(), minEff = Infinity;
    let maxP = 0, speedSum = 0;
    while (pairs.length) {
        let [s, e] = pairs.pop();
        if (e < minEff) {minEff = e}
        if (fastest.size === k) {speedSum -= fastest.poll()}
        fastest.add(s); speedSum += s;
        maxP = Math.max(maxP, speedSum*minEff)
        console.log(fastest.size, fastest.arr, minEff, maxP);
    }
    return maxP % (10**9+7)
}

const tests = [
    { n: 6, speed: [2, 10, 3, 1, 5, 8], efficiency: [5, 4, 3, 9, 7, 2], k: 2, out: 60 },
    { n: 6, speed: [2, 10, 3, 1, 5, 8], efficiency: [5, 4, 3, 9, 7, 2], k: 3, out: 68 },
    { n: 6, speed: [2, 10, 3, 1, 5, 8], efficiency: [5, 4, 3, 9, 7, 2], k: 4, out: 72 },
    { n: 6, speed: [6, 10, 3, 5, 5, 8], efficiency: [3, 4, 3, 9, 7, 2], k: 3, out: 68 },
    { n: 3, speed: [2, 8, 2], efficiency: [2, 7, 1], k: 2, out: 56 },
    { n: 3, speed: [11, 4, 4], efficiency:[2, 5, 5], k:2, out: 40}
];

tests.forEach((t, i) => console.log(
    'test', i, maxPerformance(t.n, t.speed, t.efficiency, t.k) === t.out
))