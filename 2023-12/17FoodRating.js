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
      if (this.arr[child].rating < this.arr[parent].rating) {
        var temp = this.arr[child];
        this.arr[child] = this.arr[parent];
        this.arr[parent] = temp
        this.bubbleUp(parent)
      } else if (this.arr[child].rating === this.arr[parent].rating) {
        if (this.arr[child].name < this.arr[parent].name) {
          var temp = this.arr[child];
          this.arr[child] = this.arr[parent];
          this.arr[parent] = temp
          this.bubbleUp(parent)
        }
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
    if (
      left.rating < child[0].rating ||
      (left.rating === child[0].rating && left.name < child[0].name)) {
      child = [left, le]
    }
    var right = r > this.size ? Infinity : this.arr[r];
    if (
      right.rating < child[0].rating || 
      (right.rating === child[0].rating && right.name < child[0].name)) {
      child = [right, r]
    }
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

/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function (foods, cuisines, ratings) {
  this.foods = {}
  this.cuisines = {}
  for (let i = 0; i < foods.length; i++) {
    this.foods[foods[i]] = { cuisine: cuisines[i], rating: ratings[i] }
    if (this.cuisines[cuisines[i]] === undefined) {
      this.cuisines[cuisines[i]] = new Heap()
    }
    this.cuisines[cuisines[i]].add({ name: foods[i], rating: -ratings[i] })
  }
  console.log(this.foods)
  console.log(this.cuisines)
};

/** 
* @param {string} food 
* @param {number} newRating
* @return {void}
*/
FoodRatings.prototype.changeRating = function (food, newRating) {
  this.foods[food].rating = newRating
  this.cuisines[this.foods[food].cuisine].add({ name: food, rating: -newRating })
};

/** 
* @param {string} cuisine
* @return {string}
*/
FoodRatings.prototype.highestRated = function (cuisine) {
  let foodHeap = this.cuisines[cuisine]
  while (this.foods[foodHeap.peek().name].rating !== -foodHeap.peek().rating) {
    foodHeap.poll()
  }
  return foodHeap.peek().name
};

/** 
* Your FoodRatings object will be instantiated and called as such:
* var obj = new FoodRatings(foods, cuisines, ratings)
* obj.changeRating(food,newRating)
* var param_2 = obj.highestRated(cuisine)
*/