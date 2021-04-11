const base = 10**9 + 7;
const multMod = (a, b) => {
    let out = 0;
    while (b > 0) {
        if (b%2) {out += a; out %= base}
        a *= 2; a %= base;
        b = b >> 1; 
    }
    return out
}
const contFrac = (a, b) => {
    if (a === b) { return [1] }
    if (a === 0) { return [] }
    let first = Math.floor(a / b)
    let rem = a - first * b
    return rem === 0 ? [first] : [first, ...contFrac(b, rem)]
}

const convergents = cf => {
    let top = cf[0], bottom = 1
    let out = [[top, bottom]];
    for (let i = 1; i < cf.length; i++) {
        top = i === 1 ? cf[i] * out[i - 1][0] + 1 : cf[i] * out[i - 1][0] + out[i - 2][0]
        bottom = i === 1 ? cf[1] : cf[i] * out[i - 1][1] + out[i - 2][1]
        out.push([top, bottom]);
    }
    return out
}

const multInv = (n, p) => {
    let cf = contFrac(n, p);
    let [x, y] = convergents(cf).slice(-2)[0];
    return multMod(y, n) === 1 ? y : p - y 
}

var Fancy = function() {
    this.seq = []
    this.modify = []
    this.lastModify = {mult: 1, add:0}
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    this.seq.push(val)
    this.modify.push(this.lastModify)
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    let newAdd = (this.lastModify.add + inc) % base
    this.lastModify = {mult:this.lastModify.mult, add: newAdd}
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    let newMult = (this.lastModify.mult * m) % base;
    let newAdd = (this.lastModify.add * m) % base;
    this.lastModify = {mult:newMult, add: newAdd}
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) {return -1}
    // let mult = (this.lastModify.mult * multInv(this.modify[idx].mult, base)) % base
    let mult = multMod(this.lastModify.mult, multInv(this.modify[idx].mult, base))
    // let add = this.lastModify.add - mult*this.modify[idx].add
    let add = this.lastModify.add - multMod(mult, this.modify[idx].add)
    add %= base;
    if (add < 0) {add += base}
    // console.log(this.lastModify, this.modify[idx])
    // console.log(mult, add)
    return (this.seq[idx] * mult + add) % base
};

/** 
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */