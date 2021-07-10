const base = 10**9 + 7;
const multMod = (a, b) => {
    let out = 0;
    while (b > 0) {
        if (b%2) {out = (out + a) % base}
        a = (a + a) % base;
        b = b >> 1
    }
    return out
}
const powerMod = (a, b) => {
    if (a === 1) {return 1}
    if (b === 1) {return a}
    let out = 1;
    while (b > 0) {
        if (b%2) {out = multMod(out, a)}
        a = multMod(a, a)
        b = b%2 ? (b-1)/2 : b/2
    }
    return out
}
const multInv = n => powerMod(n, base - 2)

var Fancy = function() {
    this.nums = []
    this.add = 0
    this.mult = 1
};

Fancy.prototype.append = function(val) {
    let v = val - this.add
    if (v < 0) {v += base}
    v = multMod(v, multInv(this.mult))
    this.nums.push(v)
};

Fancy.prototype.addAll = function(inc) {
    this.add += inc
};

Fancy.prototype.multAll = function(m) {
    this.mult = multMod(m, this.mult)
    this.add = multMod(m, this.add)
};

Fancy.prototype.getIndex = function(idx) {
    // console.log(this.nums, this.add, this.mult)
    if (idx >= this.nums.length) {return -1}
    let v = multMod(this.nums[idx], this.mult)
    return (v + this.add) % base
    
};