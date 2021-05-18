// https://leetcode.com/problems/jump-game-ii/
var jump = function(nums) {
    let mins = Array(nums.length);
    mins[nums.length - 1] = 0;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] === 0) {mins[i] = Infinity; continue}
        // console.log(nums[i], mins, ...mins.slice(i+1, i+nums[i]))
        mins[i] = Math.min(...mins.slice(i+1, i+nums[i]+1)) + 1        
    }
    return mins[0]
};

/**
 * public int jump(int[] A) {
	int jumps = 0, curEnd = 0, curFarthest = 0;
	for (int i = 0; i < A.length - 1; i++) {
		curFarthest = Math.max(curFarthest, i + A[i]);
		if (i == curEnd) {
			jumps++;
			curEnd = curFarthest;
		}
	}
	return jumps;
}
This is an implicit bfs solution. 
i == curEnd means you visited all the items on the current level. 
Incrementing jumps++ is like incrementing the level you are on. 
And curEnd = curFarthest is like getting the queue size (level size) for 
the next level you are traversing.

https://www.youtube.com/watch?v=vBdo7wtwlXs
 */