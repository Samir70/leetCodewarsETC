class Solution:
    def minSumOfLengths(self, nums: List[int], target: int) -> int:
        left, right, total = 0, 0, 0
        shortestBeforeIdx = []
        bestAns, shortestSoFar = 1000000, 1000000
        for right in range(len(nums)):
            total += nums[right]
            while total > target:
                total -= nums[left]
                left += 1
            if total == target:
                length = right - left + 1
                if length < shortestSoFar:
                    shortestSoFar = length
                if left > 0:
                    bestAns = min(bestAns, length + shortestBeforeIdx[left - 1])
            shortestBeforeIdx.append(shortestSoFar)
        return bestAns if bestAns < 1000000 else -1