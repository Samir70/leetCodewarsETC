# given n numbers, how many pairs (i, j), i != j are there such that ar[i] + ar[j] % k == 0
def choose2(n):
    return n*(n-1)//2
def divisibleSumPairs(n, k, ar):
    tally = [0]*k
    for a in ar:
        tally[a%k] += 1
    count = 0
    for i in range(0, 1 + k//2):
        j = 0 if i == 0 else k - i
        count += choose2(tally[i]) if i == j else tally[i]*tally[j]
    return count