/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  let cur = head, index = 0;
  while (cur !== null) {
    cur.index = index;
    index++;
    cur = cur.next;
  }
  let data = Array(index);
  cur = head, index = 0;
  while (cur !== null) {
    let indexOfRandom = cur.random === null ? null : cur.random.index
    data[index] = [cur.val, indexOfRandom];
    index++;
    cur = cur.next;
  }
  // console.log(data)
  let nodeArray = data.map(d => new Node(d[0]))
  for (let i = 0; i < data.length; i++) {
    nodeArray[i].next = nodeArray[i + 1] || null
    let randomNode = data[i][1] === null ? null : nodeArray[data[i][1]]
    nodeArray[i].random = randomNode
  }
  return nodeArray[0]
};