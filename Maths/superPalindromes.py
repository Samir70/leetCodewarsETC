def isPalindrome(n):
    s = str(n)
    for i in range(len(s)):
        if s[i] != s[-(i+1)]:
            return False
    return True
    
def superpalindromesInRange(left, right):
    l, r = int(left), int(right)
    count = 0
    for i in range(100000):
        s = str(i)
        odd = int(s + s[-2::-1])**2
        if odd > r:
            break
        if odd >= l and isPalindrome(odd):
            count += 1
    for i in range(100000):
        s = str(i)
        even = int(s + s[::-1])**2
        if (even > r):
            break
        if even >= l and isPalindrome(even):
            count += 1
    return count

print(superpalindromesInRange(1, 100000000000000000))
        
