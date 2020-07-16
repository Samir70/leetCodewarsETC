// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const listify = (n) => {
    if (n<10) {return new ListNode(n, null)}
    return new ListNode(n%10, listify(Math.floor(n/10)))
}

console.log(listify(12))

// for (var i=0; i<10; i++) {
//     var a = Math.floor(Math.random()*100000)
//     console.log(a, JSON.stringify(listify(a)))
// }

const add = (a, b) => {
    if (b === null) {return a}
    if (a === null) {return b}
    var sum = a.val + b.val;
    return new ListNode(a.val+b.val, null)
}

const tests = [
    [5, 4], [5, 6]
];

tests.forEach(t => {
    var sum = add(listify(t[0]), listify(t[1]));
    console.log(t[0], t[1], JSON.stringify(sum))
})