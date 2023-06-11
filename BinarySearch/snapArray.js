/**
 * @param {number} length
 */
var SnapshotArray = function(length) {
  this.arr = Array(length);
  for (let i = 0; i < length; i++) {
      this.arr[i] = []
      this.arr[i].push([-1, 0])
  }
  // console.log(this.arr)
  this.snapId= -1;
};

/** 
* @param {number} index 
* @param {number} val
* @return {void}
*/
SnapshotArray.prototype.set = function(index, val) {
  let last = this.arr[index].length - 1
  if (this.arr[index][last][0] === this.snapId) {
    this.arr[index][last][1] = val
  } else {
    this.arr[index].push([this.snapId, val])
  }
};

/**
* @return {number}
*/
SnapshotArray.prototype.snap = function() {
  this.snapId++
  return this.snapId
};

/** 
* @param {number} index 
* @param {number} snap_id
* @return {number}
*/
SnapshotArray.prototype.get = function(index, snap_id) {
  let keys = this.arr[index].map(idValCouplet => idValCouplet[0])
  let left = 0, right = keys.length;
  snap_id--// = Math.max(0, snap_id - 1)
  while (left < right) {
      let mid = Math.floor((left + right) / 2)
      if (keys[mid] < snap_id) {
          left = mid + 1
      } else {
          right = mid
      }
  }
  left -= keys[left] === snap_id ? 0 : 1
  console.log({arr: this.arr[index], left})
  return this.arr[index][left][1]
};

/** 
* Your SnapshotArray object will be instantiated and called as such:
* var obj = new SnapshotArray(length)
* obj.set(index,val)
* var param_2 = obj.snap()
* var param_3 = obj.get(index,snap_id)
*/

let orders = ["SnapshotArray","set","snap","get","set","snap","get","set","snap","get"]; 
let args = [[10000],[0,8445],[],[0,0],[0,4206],[],[0,0],[0,5113],[],[0,1]]; 
let outs = [null,null,0,8445,null,1,8445,null,2,5113];

let obj = new SnapshotArray(...args[0])
for (let i = 1; i < orders.length; i++) {
  let order = orders[i]
  let out = obj[order](...args[i])
  console.log({order, args: args[i], out})
}