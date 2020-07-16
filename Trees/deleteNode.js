/**
 * 
    The linked list will have at least two elements.
    All of the nodes' values will be unique.
    The given node will not be the tail and it will always be a valid node of the linked list.
    Do not return anything from your function.
 */

var deleteNode = function(node) {
    var toSkip = node.next
    node.val = toSkip.val
    node.next = toSkip.next
};