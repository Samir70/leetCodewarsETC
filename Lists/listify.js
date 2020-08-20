function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const listify = (arr) => {
    if (arr.length === 0) {return null}
    return new ListNode(arr[0], listify(arr.slice(1)))
}
const unlist = (head) => {
    if (head === null) {return []}
    return [head.val].concat(unlist(head.next))
}

module.exports = {listify, unlist}