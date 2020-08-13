/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function(characters, combinationLength) {
    this.pointers = [...Array(combinationLength)].map((x, i) => i);
    this.chars = characters;
    this.lastChar = characters.length - 1;
    this.doneLast = false;
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function() {
    if (this.doneLast) {return '#'}
    // console.log(this.pointers)
    let out = this.pointers.map(p => this.chars[p]).join('');
    let len = out.length;
    let i = this.pointers.length - 1;
    this.pointers[i]++;
    while (this.pointers[i] + len - i - 1 > this.lastChar && i > 0) {
        i--;
        this.pointers[i]++;
    }
    i++;
    while (i < this.pointers.length) {
        this.pointers[i] = this.pointers[i-1]+1
        i++
    }
    if (this.pointers[len-1] > this.lastChar) {this.doneLast = true}
    return out
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function() {
    return !this.doneLast
};

/** 
 * Your CombinationIterator object will be instantiated and called as such:
 */

const characters = 'abcde', combinationLength = 2;
var obj = new CombinationIterator(characters, combinationLength)
var out = [];
for (var i = 0; i < 15; i++) {
    out.push(obj.next());
    console.log(obj.hasNext())
}
console.log(out)